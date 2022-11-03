import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankuYouPageComponent } from './thanku-you-page.component';

describe('ThankuYouPageComponent', () => {
  let component: ThankuYouPageComponent;
  let fixture: ComponentFixture<ThankuYouPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankuYouPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankuYouPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
