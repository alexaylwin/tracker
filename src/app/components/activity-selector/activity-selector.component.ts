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
	selectedActivity: Activity;
	defaultActivity: Activity = new Activity();

	@Output()
	onSelectedActivity = new EventEmitter<Activity>();

	constructor(private activityService: ActivityService, private stateService: StateService) {
	}

	ngOnInit(): void {
		this.activityList$ = this.activityService.getActivities();
		this.selectedActivity = this.defaultActivity;
	}

	onChange(newValue) {
		console.log('Value changed:' + this.selectedActivity.name);
		this.onSelectedActivity.emit(this.selectedActivity);
		this.stateService.setSelectedActivity(this.selectedActivity);
	}

}
