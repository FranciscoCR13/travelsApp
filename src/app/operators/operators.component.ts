import { Component, inject } from '@angular/core';
import { OperatorService } from '../operator.service';
import { LoadingComponent } from "../common/components/loading/loading.component";
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [LoadingComponent, MatTableModule],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.css'
})
export class OperatorsComponent {
  operatorService = inject(OperatorService);
  
  operators: any[] = [];

  columns = ['name', 'lastName', 'email', 'phone'];

  constructor(){
    this.operatorService.getOperator().subscribe(datos => {
      this.operators = datos;
    });
  }
}
