import { Component, OnInit, ViewChild } from '@angular/core';
import { RecentActivitiesComponent } from '../recent-activities/recent-activities.component';
import { Observable, Subject } from 'rxjs/Rx';
import { ActivityRecord } from '../../models/activity-record';

@Component({
  selector: 'tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  @ViewChild(RecentActivitiesComponent)
  private recentActivitiesList: RecentActivitiesComponent;
  private localRecentActivities: Subject<Array<ActivityRecord>> = new Subject();
  private localRecentActivities$: Observable<Array<ActivityRecord>> = this.localRecentActivities.asObservable();

  private onTimerStopped(event: any): void {
    console.log('timer stopped - ' + JSON.stringify(event));
    this.recentActivitiesList.addNewRecord(event);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
