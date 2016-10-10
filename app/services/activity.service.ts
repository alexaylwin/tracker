import { Injectable } from '@angular/core';
import { Activity } from '../models/activity';
import {ACTIVITY_LIST} from './mock-activities';

@Injectable()
export class ActivityService {
	getActivities(): Promise<Activity[]> {
		return Promise.resolve(ACTIVITY_LIST);
	}
}