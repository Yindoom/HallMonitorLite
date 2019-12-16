import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCommandlineComponent } from './device-commandline.component';

describe('DeviceCommandlineComponent', () => {
  let component: DeviceCommandlineComponent;
  let fixture: ComponentFixture<DeviceCommandlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCommandlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCommandlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
