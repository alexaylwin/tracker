import { Component, ViewChild, OnInit } from '@angular/core';
import { RecentActivitiesComponent } from './recent-activities/recent-activities.component';
import { Observable, Subject } from 'rxjs/Rx';
import { ActivityRecord } from '../models/activity-record';
import { TopnavComponent } from '../components/topnav/topnav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
  }

}
