import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
    displayedColumns = [ 'date', 'name', 'duration', 'calories', 'state' ];
    dataSource = new MatTableDataSource<Exercise>();
    private exChangedSunscription !: Subscription;

    @ViewChild(MatSort) sort !: MatSort;
    @ViewChild(MatPaginator) paginator !: MatPaginator;

    constructor(private trainingServ: TrainingService) { 

    }
    ngOnDestroy(): void {
        this.exChangedSunscription.unsubscribe();
    }
    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
        this.exChangedSunscription = this.trainingServ.finishedExercisesChanged.subscribe((exercise) => {
            this.dataSource.data = exercise;
        })
        this.trainingServ.fetchCompletedOrCancelledExercises();
    }   
    
    doFilter(filterEve: any) {
        const filterValue = filterEve.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
