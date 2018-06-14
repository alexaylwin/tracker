import { Injectable } from '@angular/core';
import { Activity } from '../models/activity';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StateService {

  selectedActivity: Activity = null;

  constructor() {
  }

  setSelectedActivity(newActivity: Activity) {
    this.selectedActivity = newActivity;
  }
}
