import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/app.component';
import { RecentActivitiesComponent } from './components/recent-activities/recent-activities.component';
import { ActivitySelectorComponent } from './components/activity-selector/activity-selector.component';
import { TimerComponent } from './components/timer/timer.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { TrackerComponent } from './components/tracker/tracker.component';

import { ActivityService } from './services/activity.service';
import { RecentActivitiesService } from './services/recent-activities.service';
import { UserService } from './services/user.service';
import { StateService } from './services/state.service';

const appRoutes: Routes = [
  { path: 'track' , component: TrackerComponent},
  { path: 'activity-log', component: ActivityLogComponent },
  { path: '', redirectTo: '/track', pathMatch: 'full' }
]
/** Defining import **/
@NgModule({
  declarations: [
    AppComponent,
    RecentActivitiesComponent,
    ActivitySelectorComponent,
    TimerComponent,
    TopnavComponent,
    ActivityLogComponent,
    TrackerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ActivityService,
		RecentActivitiesService,
    UserService,
    StateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
