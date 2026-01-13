import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { ReportesService } from '../../servicios/reportes.service';
import { CalendariosService } from '../../servicios/calendarios.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-reporte-ingresos',
  standalone: false,
  templateUrl: './reporte-ingresos.component.html',
  styleUrl: './reporte-ingresos.component.css'
})
export class ReporteIngresosComponent {
  lista: any;
  datos: any;
  headers = [
    'Folio',
    'Fecha',
    'Año',
    'Semana',
    'Mes',
    'Rubro',
    'Tipo',
    'Concepto',
    'Forma de Pago', 
    'Cuenta',
    'Monto', 
    'Observaciones',
    'Evento'
  ]
  busqueda: any;
  constructor(private generales: GeneralesService, private servicio: ReportesService, private calendarios: CalendariosService){}

  ngOnInit(){
    this.traer();
  }

  traer(){
    this.calendarios.mostrar().subscribe((respuesta: any) => {
      this.lista = respuesta;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  reporte(){
    const body = {
      idCalendario: this.busqueda
    }
    this.servicio.ingresos(body).subscribe((respuesta: any) => {
      this.datos = respuesta;
      this.exportarExcel();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  exportarExcel() {
    if (!this.datos || this.datos.length === 0) {
      this.generales.interpretarError("No hay datos para exportar");
      return;
    }
  
    // Transformar los datos para que coincidan con los headers
    const exportData = this.datos.map((item: any) => ({
      'Folio': item.folio,
      'Fecha': item.created_at,
      'Año': item.ano || item.ano,
      'Semana': item.semana,
      'Mes': item.mes,
      'Rubro': item.rubro,
      'Tipo': item.tipo,
      'Concepto': item.concepto,
      'Forma de Pago': item.forma,
      'Cuenta': item.cuenta,
      'Monto': item.monto,
      'Observaciones': item.observaciones,
      'Evento': item.evento
    }));
  
    // Crear hoja de Excel
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = { Sheets: { 'Ingresos': worksheet }, SheetNames: ['Ingresos'] };
  
    // Guardar archivo
    XLSX.writeFile(workbook, `Reporte_Ingresos_${new Date().toISOString().slice(0,10)}.xlsx`);
  }

}
