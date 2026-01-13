import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { ReportesService } from '../../servicios/reportes.service';
import { CalendariosService } from '../../servicios/calendarios.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-reporte-eventos',
  standalone: false,
  templateUrl: './reporte-eventos.component.html',
  styleUrl: './reporte-eventos.component.css'
})
export class ReporteEventosComponent {
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
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  reporte(){
    const body = {
      idCalendario: this.busqueda
    }
    this.servicio.eventos(body).subscribe((respuesta: any) => {
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
      'Estatus': item.estatus,
      'Año': item.year,
      'Semana': item.semana,
      'Evento': item.folio,
      'Fecha de pago': item.fecha_pago,
      'Mes de pago': item.mes,
      'Fecha del evento': item.fecha_evento,
      'Mes del evento': item.mes_evento,
      'Vendedor': item.usuario,
      'Cliente': item.cliente,
      'Paquete': item.nombre,
      'Taller': 'Talleres',
      'Celular': item.celular,
      'Direccion': item.domicilio,
      'Horario': item.horario,
      'Personaje 1': item.personaje1,
      'Personaje 2': item.personaje2,
      'Personaje 3': item.personaje3,
      'Personaje 4': item.personaje4,
      'Personaje 5': item.personaje5,
      'Personaje 6': item.personaje6,
      'Personaje 7': item.personaje7,
      'Personaje 8': item.personaje8,
      'Personaje 9': item.personaje9,
      'Personaje 10': item.personaje10,
      'Descripcion': item.observaciones,
      'Medio': item.medio,
      'Por que nos eligio': item.motivo,
      'Forma de pago': item.forma,
      'Cuenta': item.cuenta,
      'Monto': item.monto,
      'Pago 1': item.pago1,
      'Pago 2': item.pago2,
      'Pago 3': item.pago3,
      'Pago 4': item.pago4,
      'Pago 5': item.pago5,
      'gasto 1': item.gasto1,
      'gasto 2': item.gasto2,
      'gasto 3': item.gasto3,
      'gasto 4': item.gasto4,
      'gasto 5': item.gasto5,
      'calificacion': item.calificacion,
      'saldo': item.total_liquidar
    }));
  
    // Crear hoja de Excel
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = { Sheets: { 'Ingresos': worksheet }, SheetNames: ['Ingresos'] };
  
    // Guardar archivo
    XLSX.writeFile(workbook, `Reporte_Ingresos_${new Date().toISOString().slice(0,10)}.xlsx`);
  }
}
