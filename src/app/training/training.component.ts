import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false;
  exerciseSubscription!: Subscription;

  constructor(private triningService: TrainingService) {}

  ngOnInit() {
    this.exerciseSubscription = this.triningService.exerciseChange.subscribe((exercise) => {
        this.ongoingTraining = !!(exercise);
    });
  }
}
