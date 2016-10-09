import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';
import { ActivitySelectorComponent } from './components/activity-selector.component';
import { TimerComponent } from './components/timer.component';

@NgModule({
	imports: [ BrowserModule, FormsModule ], 
	declarations: [
		AppComponent,
		ActivitySelectorComponent,
		TimerComponent ],
	bootstrap: [ AppComponent ]
})

export class AppModule { }