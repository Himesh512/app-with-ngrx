import { Injectable } from "@angular/core";
import { Exercise } from "./exercise.model";
import { Subject, Observable, map, Subscription } from 'rxjs';
import {
    Firestore,
    collectionData,
    collection,
    collectionSnapshots,
    collectionChanges,
    doc,
    setDoc,
    getDoc,
    getDocs,
    onSnapshot
} from '@angular/fire/firestore';

@Injectable()
export class TrainingService {
    exerciseChange = new Subject<Exercise | null>();
    exerciseChanged = new Subject<Exercise | null>();
    finishedExercisesChanged = new Subject<any | null>();
    private availableExercises: Exercise[] = [];
    private runnigExercise!: Exercise | null;
    private subList : Subscription[] = [];

    constructor(
        private angDb: Firestore
    ) { }

    fetchAvailableExercises() {
        const itemCollection = collection(this.angDb, 'availableExercises');
        this.subList.push(collectionChanges(itemCollection).pipe(map(res => {
            return res.map(x => {
                return {
                    id: x.doc.id,
                    name: x.doc.data()['name'],
                    duration: x.doc.data()['duration'],
                    calories: x.doc.data()['calories'],
                }
            });
        })).subscribe((exercises) => {
            this.availableExercises = exercises;
            this.exerciseChanged.next([
                ...this.availableExercises
            ] as any)
        }))
    }

    startExercise(selectedId: string) {
        this.runnigExercise = this.availableExercises.find(ex => ex.id == selectedId) as any;
        this.exerciseChange.next({ ...this.runnigExercise } as any);
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.runnigExercise,
            date: new Date(),
            state: 'completed'
        } as any);
        this.runnigExercise = null;
        this.exerciseChange.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
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

    cancelSubscription() {
        this.subList.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    async fetchCompletedOrCancelledExercises() {
        onSnapshot(collection(this.angDb, "finishedExercises"), (snapshot) => {
            let exercise: any[] = [];
            snapshot.docs.forEach(doc => exercise.push({
                ...doc.data(),
                date: new Date(doc.data()['date']['seconds'] * 1000 + doc.data()['date']['nanoseconds']/1000000),
                id: doc.id
            }))

            this.finishedExercisesChanged.next(exercise);
        });
    }

    private async addDataToDatabase(exercise: Exercise) {
        const exeRef = doc(collection(this.angDb, "finishedExercises"));
        await setDoc(exeRef, exercise);
    }
}