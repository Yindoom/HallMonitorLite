import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceOutputComponent } from './device-output.component';

describe('DeviceOutputComponent', () => {
  let component: DeviceOutputComponent;
  let fixture: ComponentFixture<DeviceOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
