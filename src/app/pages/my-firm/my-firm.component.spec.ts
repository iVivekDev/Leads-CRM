import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFirmComponent } from './my-firm.component';


describe('MyFirmComponent', () => {
  let component: MyFirmComponent;
  let fixture: ComponentFixture<MyFirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
