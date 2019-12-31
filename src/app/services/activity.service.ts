import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, concatAll } from 'rxjs/operators';
import { Activity } from '../models/activity';
import { StateService } from './state.service';
import { SERVICE_BASE_URL } from '../../environments/environment';

@Injectable()
export class ActivityService {
	private activityServiceUrl = SERVICE_BASE_URL + '/activities';
	private activityList: Activity[] = null;

	constructor(private http: HttpClient, private stateService: StateService) {}

	getActivities(): Observable<Activity[]> {

		//Simple caching, no invalidation for this data. We assume the activity list is seldom changed
		if (this.activityList !== null && this.activityList.length !== 0) {
			return of(this.activityList);
		}

		const requestOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Basic ' + this.stateService.getCurrentUser().auth
			})
		}
		const getList: Observable<Activity[]> = this.http.get<Activity[]>(
				this.activityServiceUrl + '?userid=' + this.stateService.getCurrentUser().userId, requestOptions).pipe(
			//Use a map transform to switch from a Response to an Activity array
			map( (resp) => {
					const list: Activity[] = resp;
					return list;
				})
			);
		getList.subscribe(list => this.activityList = list);
		return getList;
	}

}
