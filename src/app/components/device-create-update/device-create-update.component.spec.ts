import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCreateUpdateComponent } from './device-create-update.component';

describe('DeviceCreateUpdateComponent', () => {
  let component: DeviceCreateUpdateComponent;
  let fixture: ComponentFixture<DeviceCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
