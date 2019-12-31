import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/app.component';
import { RecentActivitiesComponent } from './components/recent-activities/recent-activities.component';
import { ActivitySelectorComponent } from './components/activity-selector/activity-selector.component';
import { TimerComponent } from './components/timer/timer.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { TrackerComponent } from './components/tracker/tracker.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

import { ActivityService } from './services/activity.service';
import { RecentActivitiesService } from './services/recent-activities.service';
import { UserService } from './services/user.service';
import { StateService } from './services/state.service';
import { MockInterceptor } from './services/mock-interceptor';

//Material components
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Bootstrap components
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ResumeActivityComponent } from './components/resume-activity/resume-activity.component';

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
    TrackerComponent,
    UserLoginComponent,
    ResumeActivityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot()
  ],
  providers: [
    ActivityService,
		RecentActivitiesService,
    UserService,
    StateService, {
      provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UserLoginComponent
  ],
})
export class AppModule { }
