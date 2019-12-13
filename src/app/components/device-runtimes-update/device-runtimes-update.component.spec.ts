import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceRuntimesUpdateComponent } from './device-runtimes-update.component';

describe('DeviceRuntimesUpdateComponent', () => {
  let component: DeviceRuntimesUpdateComponent;
  let fixture: ComponentFixture<DeviceRuntimesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceRuntimesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceRuntimesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
