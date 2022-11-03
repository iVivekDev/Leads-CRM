import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialUsedComponent } from './material-used.component';

describe('MaterialUsedComponent', () => {
  let component: MaterialUsedComponent;
  let fixture: ComponentFixture<MaterialUsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialUsedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
