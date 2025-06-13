import { Component, inject } from '@angular/core';
import { TravelService } from '../travel.service';
import { TravelStatusService } from '../travel-status.service';
import { PlaceService } from '../place.service';
import { OperatorService } from '../operator.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Travel } from '../common/models/travel.models';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { LoadingComponent } from "../common/components/loading/loading.component";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatDatepickerModule,
    MatSelectModule,
    SweetAlert2Module,
    LoadingComponent,
    CommonModule,
    DatePipe,
    FormsModule
  ],
  providers: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  travelService = inject(TravelService);
  placeService = inject(PlaceService);
  operatorService = inject(OperatorService);
  travelStatusService = inject(TravelStatusService);
  datePipe = inject(DatePipe);

  travels: Travel[] = [];
  places: any[] = [];
  operators: any[] = [];
  status: any[] = [];

  loading = false;

  columns = ['name', 'origen', 'destino', 'operador', 'fecha', 'estatus', 'actions'];

  // Aquí la dataSource de Angular Material Table
  dataSource = new MatTableDataSource<Travel>([]);

  // Filtros vinculados al formulario
  filterName = '';
  filterOriginId: number | null = null;
  filterDestinationId: number | null = null;
  filterOperatorId: number | null = null;
  filterStatusId: number | null = null;
  filterDate: Date | null = null;

  // Orden
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor() {
    this.loadData();
  }

  loadData() {
    this.placeService.getPlace().subscribe(p => {
      this.places = p;
      this.operatorService.getOperator().subscribe(op => {
        this.operators = op;
        this.travelStatusService.getTravelStatus().subscribe(st => {
          this.status = st;
          this.loadTravels();
        });
      });
    });
  }

  loadTravels() {
    this.loading = true;
    const filters = {
      name: this.filterName,
      originId: this.filterOriginId,
      destinationId: this.filterDestinationId,
      operatorId: this.filterOperatorId,
      statusId: this.filterStatusId,
      date: this.filterDate ? this.datePipe.transform(this.filterDate, 'yyyy-MM-dd') : null,
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection
    };
    this.travelService.getTravelsFiltered(filters).subscribe(travels => {
      this.travels = travels;
      this.dataSource.data = travels;  // Actualizamos el datasource con los datos filtrados
    });
  }

  applyFilters() {
    this.loadTravels();
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.loadTravels();
  }

  getPlaceName(id: number) {
    const place = this.places.find(p => p.id === id);
    return place ? place.name : 'N/A';
  }

  getOperatorName(id: number) {
    const op = this.operators.find(o => o.id === id);
    return op ? `${op.name} ${op.lastName}` : 'N/A';
  }

  getStatusName(id: number) {
    const st = this.status.find(s => s.id === id);
    return st ? st.name : 'N/A';
  }

  getStatusColor(id: number) {
    const st = this.status.find(s => s.id === id);
    return st ? st.color : 'transparent';
  }

  formatDate(dateStr: string) {
    return this.datePipe.transform(dateStr, 'dd/MM/yyyy') ?? 'N/A';
  }

  delete(id: number) {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Deseas eliminar este viaje?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.travelService.delete(id).subscribe(() => {
          Swal.fire('Eliminado!', 'El viaje ha sido eliminado.', 'success');
          this.loadTravels();
        }, error => {
          Swal.fire('Error', 'No se pudo eliminar el viaje.', 'error');
        });
      }
    });
  }

  clearFilters() {
    this.filterName = '';
    this.filterOriginId = null;
    this.filterDestinationId = null;
    this.filterOperatorId = null;
    this.filterStatusId = null;
    this.filterDate = null;
    this.loadTravels();
  }

  getSortIcon(column: string): string {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward';
    }
    return 'unfold_more';
  }
}
