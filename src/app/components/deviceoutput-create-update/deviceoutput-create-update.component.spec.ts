import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceoutputCreateUpdateComponent } from './deviceoutput-create-update.component';

describe('DeviceoutputCreateUpdateComponent', () => {
  let component: DeviceoutputCreateUpdateComponent;
  let fixture: ComponentFixture<DeviceoutputCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceoutputCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceoutputCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
