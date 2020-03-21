import { Injectable } from '@angular/core';
import { Activity } from '../models/activity';
import { User } from '../models/user'
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { ActivityStatus } from '../models/activity-status';

const MOCK_USER: User = {userId: 1, username: 'Alex', auth: ''};

@Injectable()
export class  StateService {

  //should this also be an observable for consistency?
  selectedActivity: Activity = null;
  startTime: Date = null;
  private currentUser: User;
  private stateRetrieved: boolean = false;

  private activityStatus$: BehaviorSubject<ActivityStatus>;

  //should these be wrapped in an accessor function? Probably
  userChanged$: BehaviorSubject<boolean>;

  constructor() {
    this.retrieveState();
    //Set up a subscription to save the activity state into local storage
    //whenever an activity is changed
    this.activityStatus$.subscribe((newStatus: ActivityStatus) => {
      this.saveToLocalStorage('activityStatus', newStatus);
      this.saveToLocalStorage('selectedActivity', this.selectedActivity);
      this.saveToLocalStorage('startTime', this.startTime);
    });
  }

  setStartTime(newTime: Date) {
    this.startTime = newTime;
  }

  setSelectedActivity(newActivity: Activity) {
    this.selectedActivity = newActivity;
  }
  setActivityStatus(_status: ActivityStatus) { 
    this.activityStatus$.next(_status);
  }
  getActivityStatus(): Observable<string> {
    return this.activityStatus$;
  }
  setUserChanged(_changed: boolean) {
    this.userChanged$.next(_changed);
  }
  getUserChanged(): Observable<boolean> {
    return this.userChanged$;
  }

  isLoggedIn(): boolean {
    if (this.stateRetrieved) {
      if (this.currentUser !== undefined && this.currentUser !== null) {
        return true;
      }
    }
    return false;
  }

  setCurrentUser(newUser: User) {
    this.currentUser = newUser;
    //TODO: find a good way to not keep the basic auth in local storage
    localStorage.setItem('user', JSON.stringify(newUser));
    this.userChanged$.next(true);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  //Saturate the application state from local storage or cookies
  private retrieveState() {

    this.userChanged$ = new BehaviorSubject<boolean>(false);
    this.currentUser = this.getFromLocalStorage('user');

    if (this.currentUser !== undefined && this.currentUser !== null) {
      this.stateRetrieved = true;
      this.userChanged$.next(true);
    }

    const activity: Activity = this.getFromLocalStorage('selectedActivity');
    if (activity !== undefined) {
      this.selectedActivity = activity;
    } else {
      this.selectedActivity = null;
    }

    const status: ActivityStatus = this.getFromLocalStorage('activityStatus');
    if (status !== undefined && status !== null) {
      this.activityStatus$ = new BehaviorSubject<ActivityStatus>(status);
    } else {
      this.activityStatus$ = new BehaviorSubject<ActivityStatus>(ActivityStatus.Unselected);
    }

    const time: string = this.getFromLocalStorage('startTime');
    if (time !== undefined) {
      this.startTime = new Date(time);
    } else {
      this.startTime = null;
    }

  }

  private getFromLocalStorage(key: string): any {
    const obj: string = localStorage.getItem(key);

    if (obj === undefined || obj === '') {
      return null;
    } else {
      return JSON.parse(obj);
    }
  }

  private saveToLocalStorage(key: string, obj: any) {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}
