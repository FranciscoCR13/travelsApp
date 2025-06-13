import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTravelComponent } from './form-travel.component';

describe('FormTravelComponent', () => {
  let component: FormTravelComponent;
  let fixture: ComponentFixture<FormTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
