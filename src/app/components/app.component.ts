import { Component, ViewChild, OnInit, AfterContentInit } from '@angular/core';
import { RecentActivitiesComponent } from './recent-activities/recent-activities.component';
import { Observable, Subject } from 'rxjs';
import { ActivityRecord } from '../models/activity-record';
import { StateService } from '../services/state.service';
import { MatDialog } from '@angular/material';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterContentInit {


  constructor(public dialog: MatDialog, private stateService: StateService, private userService: UserService) {}

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    if (!this.stateService.isLoggedIn()) {
      this.openLoginDialog();
    }
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(UserLoginComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(data => {
      this.userService.handleLogin(data.username, data.password);
    })
  }


}
