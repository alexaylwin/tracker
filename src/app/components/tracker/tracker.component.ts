import { Component, OnInit, ViewChild } from '@angular/core';
import { RecentActivitiesComponent } from '../recent-activities/recent-activities.component';
import { Observable, Subject } from 'rxjs/Rx';
import { ActivityRecord } from '../../models/activity-record';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html'
})
export class TrackerComponent implements OnInit {

  @ViewChild(RecentActivitiesComponent)
  private recentActivitiesList: RecentActivitiesComponent;

  onTimerStopped(event: any) {
    this.recentActivitiesList.addNewRecord(event);
  }

  constructor() { }

  ngOnInit() {
  }

}
