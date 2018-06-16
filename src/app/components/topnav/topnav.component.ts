import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserService } from '../../services/user.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'topnav',
  templateUrl: './topnav.component.html'
})
export class TopnavComponent implements OnInit {

  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {
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
