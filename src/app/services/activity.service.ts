import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Activity } from '../models/activity';
import { ActivityRecord } from '../models/activity-record';
import { UserService } from './user.service';
import { SERVICE_BASE_URL } from '../../environments/environment';


@Injectable()
export class ActivityService {
  	//Local test server
	private activityServiceUrl = SERVICE_BASE_URL + '/activities';

	private userId: number = 1;
	
	constructor(private http: Http, private userService: UserService) {
		this.userId = userService.getCurrentUser().id;
	}

	getActivities(): Observable<Activity[]>{
		return this.http.get(this.activityServiceUrl + "/" + this.userId)
			//Use a map transform to switch from a Response to an Activity array
			.map( (resp:Response) => {
				let list:Activity[];
				list = resp.json() as Activity[];
				return list;
			});
	}

}
