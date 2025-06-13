import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OperatorsComponent } from './operators/operators.component';
import { PlacesComponent } from './places/places.component';
import { CreateTravelComponent } from './create-travel/create-travel.component';
import { EditTravelComponent } from './edit-travel/edit-travel.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'places', component: PlacesComponent},
    {path: 'operators', component: OperatorsComponent},
    {path: 'createTravel', component: CreateTravelComponent},
    {path: 'editTravel/:id', component: EditTravelComponent}
];
