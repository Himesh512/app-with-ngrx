import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription, Observable, map } from 'rxjs';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss']
})

export class NewTrainingComponent implements OnInit, OnDestroy {
    exercises !: Exercise[];
    exerciseSubscription !: Subscription;

    constructor(
        private trainingService: TrainingService
    ) { }

    ngOnDestroy(): void {
        this.exerciseSubscription.unsubscribe();
    }

    ngOnInit() {
        this.exercises = [];
        this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe((exercises: any) => {
            this.exercises = exercises;
        });
        this.trainingService.fetchAvailableExercises();
    }

    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise);
    }
}
