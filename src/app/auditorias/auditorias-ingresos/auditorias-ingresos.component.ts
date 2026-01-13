import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { AuditoriasService } from '../../servicios/auditorias.service';
import { datatableConfig } from '../../interfaces/tables.interface';
import { CalendariosService } from '../../servicios/calendarios.service';

@Component({
  selector: 'app-auditorias-ingresos',
  standalone: false,
  templateUrl: './auditorias-ingresos.component.html',
  styleUrl: './auditorias-ingresos.component.css'
})
export class AuditoriasIngresosComponent {
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
      this.servicio.ingresos(body).subscribe((respuesta: any) => {
        this.datos = respuesta;
      },
      error => {
        this.generales.interpretarError(error);
      });
    }

    auditar(){
      this.servicio.auditarIngreso(this.seleccion).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Ingreso auditado correctamente');
        this.buscar();
      },
      error => {
        this.generales.interpretarError(error);
      });
    }

    pendiente(){
      this.servicio.pendienteIngreso(this.seleccion).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Ingreso auditado correctamente');
        this.buscar();
      },
      error => {
        this.generales.interpretarError(error);
      });
    }
}
