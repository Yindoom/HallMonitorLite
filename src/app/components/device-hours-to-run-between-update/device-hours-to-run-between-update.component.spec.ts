import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceHoursToRunBetweenUpdateComponent } from './device-hours-to-run-between-update.component';

describe('DeviceHoursToRunBetweenUpdateComponent', () => {
  let component: DeviceHoursToRunBetweenUpdateComponent;
  let fixture: ComponentFixture<DeviceHoursToRunBetweenUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceHoursToRunBetweenUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceHoursToRunBetweenUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
