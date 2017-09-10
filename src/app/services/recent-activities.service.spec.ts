import { TestBed, inject } from '@angular/core/testing';

import { RecentActivitiesService } from './recent-activities.service';

describe('RecentActivitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecentActivitiesService]
    });
  });

  it('should be created', inject([RecentActivitiesService], (service: RecentActivitiesService) => {
    expect(service).toBeTruthy();
  }));
});
