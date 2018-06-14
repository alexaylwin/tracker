import { Injectable } from '@angular/core';
import { Activity } from '../models/activity';
import { User } from '../models/user'
import { Observable } from 'rxjs/Observable';
import { EventEmitter } from '@angular/core';

const MOCK_USER: User = {userId: 1, username: 'Alex', auth: ''};

@Injectable()
export class StateService {

  selectedActivity: Activity = null;
  currentUser: User = MOCK_USER;
  loggedIn: boolean = false;

  loggedInEvt: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  setSelectedActivity(newActivity: Activity) {
    this.selectedActivity = newActivity;
  }

  setLoggedIn(val: boolean) {
    this.loggedIn = val;
    this.loggedInEvt.emit(val);
  }

  setCurrentUser(newUser: User) {
    this.currentUser = newUser;
  }
}
