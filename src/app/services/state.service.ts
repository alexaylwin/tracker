import { Injectable } from '@angular/core';
import { Activity } from '../models/activity';
import { User } from '../models/user'
import { Observable } from 'rxjs/Observable';

const MOCK_USER: User = {userId: 1, username: 'Alex', auth: ''};

@Injectable()
export class StateService {

  selectedActivity: Activity = null;
  currentUser: User = MOCK_USER;
  loggedIn: boolean = false;

  constructor() {
  }

  setSelectedActivity(newActivity: Activity) {
    this.selectedActivity = newActivity;
  }

  setCurrentUser(newUser: User) {
    if (newUser.auth !== '') {
      this.loggedIn = true;
    }
    this.currentUser = newUser;
  }
}
