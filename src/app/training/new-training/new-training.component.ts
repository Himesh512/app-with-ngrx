import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Firestore, collectionData, collection, collectionSnapshots, collectionChanges } from '@angular/fire/firestore';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
    exercises !: Observable<Exercise[]>;

    constructor(
        private trainingService: TrainingService,
        private angDb: Firestore

    ) { }

    ngOnInit() {
        const itemCollection = collection(this.angDb, 'availableExercises');
        this.exercises = collectionChanges(itemCollection).pipe(map(res => {
            return res.map(x => {
                return {
                    id: x.doc.id,
                    name: x.doc.data()['name'],
                    duration: x.doc.data()['duration'],
                    calories: x.doc.data()['calories'],
                }
            });
        }))

    }

    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise);
    }
}
