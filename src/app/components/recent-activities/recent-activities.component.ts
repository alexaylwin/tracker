import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Activity } from "../../models/activity";
import { ActivityRecord } from "../../models/activity-record"
import { RecentActivitiesService } from '../../services/recent-activities.service';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
  selector: 'recent-activities',
  templateUrl: './recent-activities.component.html',
  styleUrls: ['./recent-activities.component.scss']
})
export class RecentActivitiesComponent implements OnInit {

	recentActivities$: Observable<ActivityRecord>;
	private localRecentActivities:Subject<ActivityRecord> = new Subject();
	recentActivities: ActivityRecord[] = new Array();
	
	constructor(private recentActivitiesService: RecentActivitiesService) {}
	
	ngOnInit(): void {
		this.recentActivities$ = Observable.merge(this.localRecentActivities.asObservable(), this.recentActivitiesService.getRecentActivities());
		this.recentActivities$.subscribe({
			next: (record:ActivityRecord) => {
				this.recentActivities.unshift(record);
			}
		})
	}

	addNewRecord(event: any):void {
		this.localRecentActivities.next(event);
	}
}
