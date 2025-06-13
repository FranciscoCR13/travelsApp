import { Component, inject } from '@angular/core';
import { PlaceService } from '../place.service';
import { LoadingComponent } from "../common/components/loading/loading.component";
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [LoadingComponent, MatTableModule, CommonModule, MatIconModule],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css'
})
export class PlacesComponent {
  placeService = inject(PlaceService);
      
  places: any[] = [];

  loading = true;

  columns = ['name', 'country', 'state', 'city', 'address', 'zipCode', 'active'];

  constructor(){
    this.loading = true;
    this.placeService.getPlace().subscribe(datos => {
      this.places = datos;
      this.loading = false;
    }, error => {
      this.loading = false; 
    });
  }
}
