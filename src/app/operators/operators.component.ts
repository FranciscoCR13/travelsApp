import { Component, inject } from '@angular/core';
import { OperatorService } from '../operator.service';
import { LoadingComponent } from "../common/components/loading/loading.component";
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [LoadingComponent, MatTableModule, CommonModule, MatIconModule],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.css'
})
export class OperatorsComponent {
  operatorService = inject(OperatorService);
  
  operators: any[] = [];

  loading = true;

  columns = ['name', 'lastName', 'email', 'phone', 'active'];

  constructor(){
    this.loading = true;
    this.operatorService.getOperator().subscribe(datos => {
      this.operators = datos;
      this.loading = false;
    }, error => {
      this.loading = false; 
    });
  }
}
