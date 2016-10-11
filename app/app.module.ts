import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app.component';
import { ActivitySelectorComponent } from './components/activity-selector.component';
import { TimerComponent } from './components/timer.component';
import { ActivityService } from './services/activity.service';

@NgModule({
	imports: [ 
		BrowserModule, 
		FormsModule, 
		HttpModule ], 
	declarations: [
		AppComponent,
		ActivitySelectorComponent,
		TimerComponent ],
	providers: [
    	ActivityService
  	],
	bootstrap: [ AppComponent ]
})

export class AppModule { }