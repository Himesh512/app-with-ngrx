import { Exercise } from "./exercise.model";
import { Subject } from "rxjs";

export class TrainingService {
    exerciseChange = new Subject<Exercise | null>();
    private availableExercises: Exercise[] = [
        { id: 'crunches' , name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes' , name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'crunches' , name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees' , name: 'Burpees', duration: 60, calories: 8 }
    ];
    private runnigExercise!: Exercise | null;
    private exercises: Exercise[] = [];

    constructor() {}
    
    getAvailableExercises() {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        this.runnigExercise = this.availableExercises.find( ex => ex.id == selectedId ) as any;
        this.exerciseChange.next({ ...this.runnigExercise } as any);
    }

    completeExercise() {
        this.exercises.push({
            ...this.runnigExercise,
            date: new Date(),
            state: 'completed'
        } as any);
        this.runnigExercise = null;
        this.exerciseChange.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({
            ...this.runnigExercise,
            date: new Date(),
            duration: this.runnigExercise!.duration * (progress / 100),
            calories: this.runnigExercise!.calories * (progress / 100),
            state: 'cancelled'
        } as any);
        this.runnigExercise = null;
        this.exerciseChange.next(null);
    }

    getRunningExcercise() {
        return {
            ...this.runnigExercise
        } as any
    }

    getCompletedOrCancelledExercises() {
        return this.exercises.slice();
    }
}