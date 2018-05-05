import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { Store, StoreModule, ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { timerReducer, AppState } from './store/timer.reducer';

import { AppComponent } from './components/app.component';
import { RecentActivitiesComponent } from './components/recent-activities/recent-activities.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { TimerComponent } from './components/timer/timer.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { TrackerComponent } from './components/tracker/tracker.component';

import { ActivityService } from './services/activity.service';
import { RecentActivitiesService } from './services/recent-activities.service';
import { UserService } from './services/user.service';

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
    ActivityListComponent,
    TimerComponent,
    TopnavComponent,
    ActivityLogComponent,
    TrackerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(timerReducer)
  ],
  providers: [
    ActivityService,
    RecentActivitiesService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
