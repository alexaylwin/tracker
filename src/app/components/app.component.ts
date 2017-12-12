import { Component, ViewChild } from '@angular/core';
import { RecentActivitiesComponent } from './recent-activities/recent-activities.component';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  @ViewChild(RecentActivitiesComponent)
  private recentActivitiesList:RecentActivitiesComponent;
  
  title = 'app';

  private onTimerStopped(event: any) {
      this.recentActivitiesList.addNewRecord(event);
  }

}
