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
  busqueda: any;
  constructor(private generales: GeneralesService, private servicio: ReportesService, private calendarios: CalendariosService){}

  ngOnInit(){
    this.traer();
  }

  traer(){
    this.calendarios.mostrar().subscribe((respuesta: any) => {
      this.lista = respuesta;
      if (this.lista && this.lista.length > 0) {
        const anioActual = new Date().getFullYear().toString();
        const actual = this.lista.find((c: any) => c.nombre === anioActual);
        if (actual) {
          this.busqueda = actual.id;
        }
      }
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  reporte(){
    if (!this.busqueda || this.busqueda === 0 || this.busqueda === '0') {
      this.generales.mensajeError('Por favor selecciona un calendario');
      return;
    }
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
      this.generales.mensajeError("No hay datos para exportar");
      return;
    }
  
    // Transformar los datos para que coincidan con los headers
    const exportData = this.datos.map((item: any) => ({
      'Folio': item.folio,
      'Año': item.calendario,
      'Fecha': item.fecha,
      'Rubro': item.rubro,
      'Tipo': item.tipo,
      'Concepto': item.concepto,
      'Forma de Pago': item.forma,
      'Cuenta': item.cuenta,
      'Monto': item.monto,
      'Evento': item.evento
    }));
  
    // Crear hoja de Excel
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = { Sheets: { 'Ingresos': worksheet }, SheetNames: ['Ingresos'] };
  
    // Guardar archivo
    XLSX.writeFile(workbook, `Reporte_Ingresos_${new Date().toISOString().slice(0,10)}.xlsx`);
  }

}
