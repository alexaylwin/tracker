import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Activity } from '../../models/activity';
import { ActivityService } from '../../services/activity.service';
import { StateService } from '../../services/state.service';
import { ActivityStatus } from '../../models/activity-status';

@Component({
  selector: 'activity-selector',
  templateUrl: './activity-selector.component.html',
})
export class ActivitySelectorComponent implements OnInit {
	activityList$: Observable<Array<Activity>>;

	constructor(private activityService: ActivityService, private stateService: StateService) {}

	ngOnInit(): void {
		this.stateService.userChanged$.subscribe(val => {
			if (val) {
				this.activityList$ = this.activityService.getActivities();
			}
		});

		this.stateService.activityStatus$.subscribe(status => console.log(status));
	}

	selectActivity(activity: Activity): void {
		this.stateService.setSelectedActivity(activity);
		this.stateService.setStartTime(new Date());
		this.stateService.activityStatus$.next(ActivityStatus.Started);
	}

	stopActivity(): void {
		this.stateService.activityStatus$.next(ActivityStatus.Stopped);
	}

	getActivityStatus(): Observable<string> {
		return this.stateService.activityStatus$;
	}
}
