import { Exercise } from "./exercise.model";
import { Subject } from "rxjs";

export class TrainingService {
    exerciseChange = new Subject<Exercise>();
    private availableExercises: Exercise[] = [
        { id: 'crunches' , name: 'Crunches', duration: 30, calaries: 8 },
        { id: 'touch-toes' , name: 'Touch Toes', duration: 180, calaries: 15 },
        { id: 'crunches' , name: 'Side Lunges', duration: 120, calaries: 18 },
        { id: 'burpees' , name: 'Burpees', duration: 60, calaries: 8 }
    ];
    private runnigExercise!: Exercise;

    constructor() {}
    
    getAvailableExercises() {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        this.runnigExercise = this.availableExercises.find( ex => ex.id == selectedId ) as any;
        this.exerciseChange.next({ ...this.runnigExercise });
    }
}