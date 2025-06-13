import { Component, inject } from '@angular/core';
import { TravelService } from '../travel.service';
import { TravelCreate } from '../common/models/travel.models';
import { Router } from '@angular/router';
import { FormTravelComponent } from "../form-travel/form-travel.component";

@Component({
  selector: 'app-create-travel',
  standalone: true,
  imports: [FormTravelComponent],
  templateUrl: './create-travel.component.html',
  styleUrl: './create-travel.component.css'
})
export class CreateTravelComponent {
  router = inject(Router);
  travelService = inject(TravelService);

  guardarCambios(travel: TravelCreate) {
    this.travelService.create(travel).subscribe(() => {
      this.router.navigate([""]);
    });
  }

}
