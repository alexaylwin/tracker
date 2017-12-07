import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Activity } from '../models/activity';
import { ActivityRecord } from '../models/activity-record';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import {UserService} from './user.service';
import { SERVICE_BASE_URL } from '../../environments/environment';


@Injectable()
export class ActivityService {
  	//Local test server
	private activityServiceUrl = SERVICE_BASE_URL + '/activities';

	private userId: number = 1;
	
	constructor(private http: Http, private userService: UserService) {
		this.userId = userService.getCurrentUser().userId;
	}

	getActivities(): Promise<Activity[]>{
		return this.http.get(this.activityServiceUrl + "/" + this.userId)
			.toPromise()
			.then(response => response.json() as Activity[]);
	}

}
