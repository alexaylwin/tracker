import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
		const my_headers: HttpHeaders = new HttpHeaders()
			.set('Authorization', 'Basic abc123')
			.set('Set-Cookie', 't_auth=abc123');
		let requestOptions = {
			withCredentials: true,
			headers: my_headers
		}
		console.log(my_headers);
		return this.http.get<Activity[]>(this.activityServiceUrl + "?userid=" + this.userId, requestOptions).pipe(
			//Use a map transform to switch from a Response to an Activity array
			map( (resp) => {
					let list:Activity[];
					list = resp;
					return list;
				})
			);	
	}

}
