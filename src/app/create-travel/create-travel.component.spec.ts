import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTravelComponent } from './create-travel.component';

describe('CreateTravelComponent', () => {
  let component: CreateTravelComponent;
  let fixture: ComponentFixture<CreateTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
