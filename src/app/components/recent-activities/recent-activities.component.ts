import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Activity } from '../../models/activity';
import { ActivityRecord } from '../../models/activity-record'
import { RecentActivitiesService } from '../../services/recent-activities.service';
import { Observable, Subject } from 'rxjs/Rx';
import * as moment from 'moment';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'recent-activities',
  templateUrl: './recent-activities.component.html'
})
export class RecentActivitiesComponent implements OnInit {

	recentActivities$: Observable<ActivityRecord>;
	private localRecentActivities: Subject<ActivityRecord> = new Subject();
	recentActivities: DisplayRecord[] = new Array();

	constructor(private recentActivitiesService: RecentActivitiesService, private stateService: StateService) {}

	ngOnInit(): void {
		this.stateService.userChanged$.subscribe(val => {
			if (val) {
				this.recentActivities$ = Observable.merge(
					this.localRecentActivities.asObservable(), this.recentActivitiesService.getRecentActivities());
				this.recentActivities$.subscribe({
					next: (record: ActivityRecord) => {
						console.log('new record pushed');
						this.recentActivities.unshift(new DisplayRecord(record));
					}
				})
			}
		});
	}

	addNewRecord(event: any): void {
		this.localRecentActivities.next(event);
	}

	dismissNotification(index: number) {
		this.recentActivities.splice(index, 1);
	}
}

class DisplayRecord {
	activityName: string;
	startTime: string;
	endTime: string;
	displayDate: string;

	constructor(record: ActivityRecord) {
		this.activityName = 'Activity ' + record.activityId;
		const startWrapper = moment(record.startTime);
		const endWrapper = moment(record.endTime);

		if (startWrapper.date() === endWrapper.date()) {
			this.startTime = startWrapper.format('h:mm A');
			this.endTime = endWrapper.format('h:mm A');
			this.displayDate = startWrapper.format('MMMM DD, YYYY');
		} else {
			this.startTime = startWrapper.format('MMMM DD, YYYY h:mm A')
			this.endTime = endWrapper.format('MMMM DD, YYYY h:mm A')
			this.displayDate = startWrapper.format('MMMM DD, YYYY') + ' to ' + endWrapper.format('MMMM DD, YYYY');
		}
	}
}
