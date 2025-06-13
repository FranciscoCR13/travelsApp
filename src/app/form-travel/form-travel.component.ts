  import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
  import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
  import { MatButtonModule } from '@angular/material/button';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import {MatInputModule} from '@angular/material/input';
  import { MatDatepickerModule } from '@angular/material/datepicker';
  import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
  import { RouterLink } from '@angular/router';
  import { Travel, TravelCreate } from '../common/models/travel.models';
  import { PlaceService } from '../place.service';
  import { OperatorService } from '../operator.service';
  import { TravelStatusService } from '../travel-status.service';
  import { MatSelectModule } from '@angular/material/select';
  import { CommonModule } from '@angular/common';
  import { MatIconModule } from '@angular/material/icon';
  import { Validators } from '@angular/forms';
  import { AbstractControl, ValidationErrors } from '@angular/forms';

  @Component({
    selector: 'app-form-travel',
    standalone: true,
    imports: [
      CommonModule,
      RouterLink,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatOptionModule,
      MatSelectModule,
      MatIconModule
    ],
    templateUrl: './form-travel.component.html',
    styleUrl: './form-travel.component.css'
  })
  export class FormTravelComponent implements OnInit{
    
    private readonly formBuilder = inject(FormBuilder);
    private readonly placeService = inject(PlaceService);
    private readonly operatorService = inject(OperatorService);
    private readonly travelStatusService = inject(TravelStatusService);

    places: any[] = [];
    operators: any[] = [];
    status: any[] = [];

    @Input({required: true})
    title!: string;

    @Input()
    model?: Travel

    @Output()
    postForm = new EventEmitter<TravelCreate>();

    form = this.formBuilder.group({
      name: ['', Validators.required],
      originId: [0, [Validators.required, Validators.min(1)]],
      destinationId: [0, [Validators.required, Validators.min(1)]],
      operatorId: [0, [Validators.required, Validators.min(1)]],
      statusId: [0, [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      startTime: ['', [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)]],
      endDate: ['', Validators.required],
      endTime: ['', [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)]],
      notes: ['']
    });

    ngOnInit(): void {
      if(this.model !== undefined){
        this.form.patchValue(this.model)
      }

      this.operatorService.getOperator().subscribe(data => {
        this.operators = data;
      });

      this.placeService.getPlace().subscribe(data => {
        this.places = data;
      });

      this.travelStatusService.getTravelStatus().subscribe(data => {
        this.status = data;
      });
      this.form.setValidators(this.dateTimeRangeValidator);

      this.form.valueChanges.subscribe(() => {
        this.form.updateValueAndValidity({ onlySelf: true });
      });
    }

    dateTimeRangeValidator(control: AbstractControl): ValidationErrors | null {
      const startDate = control.get('startDate')?.value;
      const startTime = control.get('startTime')?.value;
      const endDate = control.get('endDate')?.value;
      const endTime = control.get('endTime')?.value;

      if (!startDate || !startTime || !endDate || !endTime) {
        return null; // Deja que los required hagan su trabajo
      }

      // Combinar fecha y hora para comparar
      const start = new Date(startDate);
      const [startH, startM] = startTime.split(':').map(Number);
      start.setHours(startH, startM, 0);

      const end = new Date(endDate);
      const [endH, endM] = endTime.split(':').map(Number);
      end.setHours(endH, endM, 0);

      if (start >= end) {
        return { dateRangeInvalid: true };
      }

      return null;
    }

    guardarCambios() {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      let travel = this.form.value as TravelCreate;
      this.postForm.emit(travel);
    }

  }
