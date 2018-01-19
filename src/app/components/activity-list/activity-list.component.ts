import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Activity } from '../../models/activity';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  activityList$: Observable<Array<Activity>>;
  selectedActivity: Activity;
  private activityService: ActivityService;

  @Output()
  onSelectedActivity = new EventEmitter<Activity>();

  constructor(activityService: ActivityService) {
    this.activityService = activityService;
  }

  ngOnInit(): void {
    this.activityList$ = this.activityService.getActivities();
  }

  onChange(newValue) {
    console.log('Value changed:' + this.selectedActivity.name);
    this.onSelectedActivity.emit(this.selectedActivity);
  }

}
