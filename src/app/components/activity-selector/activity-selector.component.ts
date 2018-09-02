import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Activity } from '../../models/activity';
import { ActivityService } from '../../services/activity.service';
import { StateService } from '../../services/state.service';

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
	}

	selectActivity(activity: Activity): void {
		this.stateService.setSelectedActivity(activity);
	}
}
