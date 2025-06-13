import { Component, inject } from '@angular/core';
import { PlaceService } from '../place.service';
import { LoadingComponent } from "../common/components/loading/loading.component";
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [LoadingComponent, MatTableModule],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css'
})
export class PlacesComponent {
  placeService = inject(PlaceService);
      
  places: any[] = [];

   columns = ['name', 'country', 'state', 'city', 'address', 'zipCode'];

  constructor(){
    this.placeService.getPlace().subscribe(datos => {
      this.places = datos;
    });
  }
}
