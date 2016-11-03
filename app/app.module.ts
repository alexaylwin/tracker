import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app.component';
import { ActivitySelectorComponent } from './components/activity-selector.component';
import { TimerComponent } from './components/timer.component';
import { RecentActivitiesComponent } from './components/recent-activities.component';
import { ActivityService } from './services/activity.service';
import { RecentActivitiesService } from './services/recent-activities.service';

@NgModule({
	imports: [ 
		BrowserModule, 
		FormsModule, 
		HttpModule ], 
	declarations: [
		AppComponent,
		ActivitySelectorComponent,
		TimerComponent,
		RecentActivitiesComponent ],
	providers: [
    	ActivityService,
		RecentActivitiesService
  	],
	bootstrap: [ AppComponent ]
})

export class AppModule { }