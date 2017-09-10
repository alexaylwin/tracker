import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app.component';
import { RecentActivitiesComponent } from './components/recent-activities/recent-activities.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { TimerComponent } from './components/timer/timer.component';

import { ActivityService } from './services/activity.service';
import { RecentActivitiesService } from './services/recent-activities.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    RecentActivitiesComponent,
    ActivityListComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ActivityService,
		RecentActivitiesService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
