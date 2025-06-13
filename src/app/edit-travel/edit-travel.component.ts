import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { TravelService } from '../travel.service';
import { Travel, TravelCreate } from '../common/models/travel.models';
import { FormTravelComponent } from '../form-travel/form-travel.component';
import { Router } from '@angular/router';
import { LoadingComponent } from "../common/components/loading/loading.component";

@Component({
  selector: 'app-edit-travel',
  standalone: true,
  imports: [FormTravelComponent, LoadingComponent],
  templateUrl: './edit-travel.component.html',
  styleUrl: './edit-travel.component.css'
})
export class EditTravelComponent implements OnInit{
  ngOnInit(): void {
    this.travelService.getById(this.id).subscribe(travel => {
      this.model = travel;
    });
  }
  @Input({transform: numberAttribute})
  id!: number;

  travelService = inject(TravelService);
  router = inject(Router);
  model?: Travel;

  guardarCambios(travel: TravelCreate){
    console.log(travel);
    this.travelService.update(this.id, travel).subscribe(() =>{
      this.router.navigate(['']);
    });
  }
}
