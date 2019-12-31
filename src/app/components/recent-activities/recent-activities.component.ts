
import { Activity } from '../../models/activity';
import { ActivityRecord } from '../../models/activity-record'
import { RecentActivitiesService } from '../../services/recent-activities.service';
import { Observable, Subject, merge } from 'rxjs';
import * as moment from 'moment';
import { StateService } from '../../services/state.service';
import { ActivityService } from '../../services/activity.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'recent-activities',
  templateUrl: './recent-activities.component.html'
})
export class RecentActivitiesComponent implements OnInit {

	recentActivities$: Observable<ActivityRecord>;
	private localRecentActivities: Subject<ActivityRecord> = new Subject();
	recentActivities: DisplayRecord[] = new Array();

	private activityList: Activity[] = new Array();

	constructor(private recentActivitiesService: RecentActivitiesService,
		private stateService: StateService, private activityService: ActivityService) {}

	ngOnInit(): void {
		this.activityService.getActivities().subscribe(
			list => this.activityList = list
		);

		this.stateService.userChanged$.subscribe(val => {
			if (val) {
				this.recentActivities$ = merge(
          this.localRecentActivities.asObservable(), this.recentActivitiesService.getRecentActivities()
        );
				this.recentActivities$.subscribe({
					next: (record: ActivityRecord) => {
						this.recentActivities.unshift(new DisplayRecord(record, this.activityList));
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
	duration: string;

	constructor(record: ActivityRecord, activityList: Activity[]) {
		for (let i = 0; i < activityList.length; i++) {
			if (record.activityId === activityList[i].id) {
				this.activityName = activityList[i].name;
			}
		}

		if (this.activityName === '' || this.activityName === undefined) {
			this.activityName = 'Activity ' + record.activityId;
		}

		const startWrapper = moment(record.startTime);
		const endWrapper = moment(record.endTime);
		const durationWrapper = moment.duration(endWrapper.diff(startWrapper, 'minute', false), 'minutes');
		this.duration = durationWrapper.asMinutes().toString();

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
