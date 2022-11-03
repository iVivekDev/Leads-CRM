import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperOptionComponent } from './developer-option.component';

describe('DeveloperOptionComponent', () => {
  let component: DeveloperOptionComponent;
  let fixture: ComponentFixture<DeveloperOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloperOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
