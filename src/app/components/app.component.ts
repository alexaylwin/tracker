import { Component, ViewChild, OnInit } from '@angular/core';
import { RecentActivitiesComponent } from './recent-activities/recent-activities.component';
import { Observable, Subject } from 'rxjs/Rx';
import { ActivityRecord } from '../models/activity-record';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
<<<<<<< HEAD
export class AppComponent implements OnInit {
  
  @ViewChild(RecentActivitiesComponent)
  private recentActivitiesList: RecentActivitiesComponent;
  private localRecentActivities: Subject<Array<ActivityRecord>> = new Subject();
  private localRecentActivities$: Observable<Array<ActivityRecord>> = this.localRecentActivities.asObservable();

  title = 'app';

  constructor() {}

  ngOnInit() {
    //this.recentActivitiesList.localRecentActivitesObs$ = this.localRecentActivities$;
  }

  private onTimerStopped(event: any) {
    console.log('timer stopped - ' + JSON.stringify(event));
    //this.localRecentActivities.next([event]);
    this.recentActivitiesList.addNewRecord(event);
=======
export class AppComponent implements OnInit{

  ngOnInit() {
>>>>>>> a22423c5060e7dbd53e0fd94f5db61ddf3069355
  }

}
