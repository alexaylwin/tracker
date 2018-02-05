import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentActivitiesComponent } from './recent-activities.component';
import { RecentActivitiesService } from '../../services/recent-activities.service';
import { ActivityRecord } from '../../models/activity-record';
import { Observable } from 'rxjs/Rx';

describe('RecentActivitiesComponent', () => {
  let component: RecentActivitiesComponent;
  let fixture: ComponentFixture<RecentActivitiesComponent>;

  const recentServiceStub: any = {
    getRecentActivities: function(): Observable<ActivityRecord>  {
      return Observable.of(new ActivityRecord());
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentActivitiesComponent ],
      providers:[ {provide:RecentActivitiesService, useValue:recentServiceStub} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
