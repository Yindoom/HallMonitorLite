import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceOutputCreateUpdateComponent } from './device-output-create-update.component';

describe('DeviceOutputCreateUpdateComponent', () => {
  let component: DeviceOutputCreateUpdateComponent;
  let fixture: ComponentFixture<DeviceOutputCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceOutputCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceOutputCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
