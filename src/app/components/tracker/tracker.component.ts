import { Component, OnInit, ViewChild } from '@angular/core';
import { RecentActivitiesComponent } from '../recent-activities/recent-activities.component';
import { Observable, Subject } from 'rxjs/Rx';
import { ActivityRecord } from '../../models/activity-record';
import { StateService } from 'app/services/state.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html'
})
export class TrackerComponent implements OnInit {

  @ViewChild(RecentActivitiesComponent)
  private recentActivitiesList: RecentActivitiesComponent;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    //this.stateService.
  }

  onTimerStopped(event: any) {
    this.recentActivitiesList.addNewRecord(event);
  }



}
