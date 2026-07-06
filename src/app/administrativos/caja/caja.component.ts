import { Component } from '@angular/core';
import { BalancesService } from '../../servicios/balances.service';
import { GeneralesService } from '../../servicios/generales.service';
import { ReportesService } from '../../servicios/reportes.service';
declare function exportCSVFile(headers: any, items: any, filename: string): void;

@Component({
  selector: 'app-caja',
  standalone: false,
  templateUrl: './caja.component.html',
  styleUrl: './caja.component.css'
})
export class CajaComponent {
  total: any;
  ingreso: any;
  egreso: any;
  datos: any;
  headers = [
    'Tipo',
    'Forma de pago',
    'Rubro',
    'Tipo de pago',
    'Monto',
    'Fecha'
  ];
  constructor(public generales: GeneralesService, private servicio: BalancesService,
    private reportes: ReportesService
  ){}
  
  ngOnInit(): void {
    this.mostrar();
  }

  mostrar(){
    this.servicio.caja().subscribe((respuesta: any) => {
      this.total = respuesta.total;
      this.ingreso = respuesta.ingreso;
      this.egreso = respuesta.egreso;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  reporte(){
    this.reportes.caja().subscribe((respuesta: any) => {
      this.datos = respuesta;
      this.excel();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  excel(){
    exportCSVFile(this.headers, this.datos, 'Corte de caja');
  }
  
}
