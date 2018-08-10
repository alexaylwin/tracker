import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentActivitiesComponent } from './recent-activities.component';
import { RecentActivitiesService } from '../../services/recent-activities.service';
import { StateService } from '../../services/state.service';

let recentActivitiesServiceStub = {};
let stateServiceStub = {};

describe('RecentActivitiesComponent', () => {
  let component: RecentActivitiesComponent;
  let fixture: ComponentFixture<RecentActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentActivitiesComponent ],
      providers:[
        {provide:RecentActivitiesService, useValue: recentActivitiesServiceStub},
        {provide:StateService, useValue: stateServiceStub}
      ]
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
