import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { map, concatAll } from 'rxjs/operators';
import { Activity } from '../models/activity';
import { ActivityRecord } from '../models/activity-record';
import { UserService } from './user.service';
import { SERVICE_BASE_URL } from '../../environments/environment';


@Injectable()
export class ActivityService {
  	//Local test server
	private activityServiceUrl = SERVICE_BASE_URL + '/activities';

	private userId: number = 1;
	
	constructor(private http: HttpClient, private userService: UserService) {
		this.userId = userService.getCurrentUser().userId;
	}

	getActivities(): Observable<Activity[]>{
		return this.http.get<Activity[]>(this.activityServiceUrl + "/" + this.userId).pipe(
			//Use a map transform to switch from a Response to an Activity array
			map( (resp) => {
					let list:Activity[];
					list = resp;
					return list;
				})
			);
	}

}
