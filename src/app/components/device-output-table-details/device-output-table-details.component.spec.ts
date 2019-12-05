import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceOutputTableDetailsComponent } from './device-output-table-details.component';

describe('DeviceOutputTableDetailsComponent', () => {
  let component: DeviceOutputTableDetailsComponent;
  let fixture: ComponentFixture<DeviceOutputTableDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceOutputTableDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceOutputTableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
