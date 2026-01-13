import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { AuditoriasService } from '../../servicios/auditorias.service';
import { CalendariosService } from '../../servicios/calendarios.service';

@Component({
  selector: 'app-auditorias-egresos',
  standalone: false,
  templateUrl: './auditorias-egresos.component.html',
  styleUrl: './auditorias-egresos.component.css'
})
export class AuditoriasEgresosComponent {
  configuracion: datatableConfig = {
    alias: ['Folio', 'Calendario', 'Monto', 'Forma de pago', 'Rubro', 'Tipo'],
    encabezados: ['folio', 'calendario', 'monto', 'forma', 'rubro', 'tipo'],
    busqueda: true
  };
  datos: any;
  seleccion: any;
  lista: any;
  busqueda: any;
  
  constructor(private generales: GeneralesService, private servicio: AuditoriasService, private calendarios: CalendariosService){}
  
  ngOnInit(): void {
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

  buscar(){
    const body = {
      idCalendario: this.busqueda
    }
    this.servicio.egresos(body).subscribe((respuesta: any) => {
      this.datos = respuesta;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  auditar(){
    this.servicio.auditarEgreso(this.seleccion).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Egreso auditado correctamente');
      this.buscar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  pendiente(){
    this.servicio.pendienteEgreso(this.seleccion).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Egreso auditado correctamente');
      this.buscar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
