import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserService } from '../../services/user.service';
import { StateService } from '../../services/state.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'topnav',
  templateUrl: './topnav.component.html'
})
export class TopnavComponent implements OnInit, AfterViewInit {

  isCollapsed: boolean = true;

  constructor(public dialog: MatDialog, private userService: UserService, 
    private stateService:StateService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if(!this.stateService.isLoggedIn()) {
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
