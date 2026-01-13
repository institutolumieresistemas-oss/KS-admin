import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { ConfiguracionesService } from '../../servicios/configuraciones.service';
import { datatableConfig } from '../../interfaces/tables.interface';

@Component({
    selector: 'app-configuraciones-notificaciones',
    templateUrl: './configuraciones-notificaciones.component.html',
    styleUrl: './configuraciones-notificaciones.component.css',
    standalone: false
})
export class ConfiguracionesNotificacionesComponent {
  usuarios: any;
  ingresos = new Array();
  egresos = new Array();
  seleccion = 0;
  listado: any;
  vista = '';
  constructor(private generales: GeneralesService, private servicio: ConfiguracionesService){}
  
  ngOnInit(): void {
    this.mostrar();
  }
  
  modal(){
    this.vista = '';
    this.generales.delay(500).then(fun => {
      this.vista = 'q';
      this.generales.abrirModal();
    });
  }

  mostrar(){
    this.servicio.notificaciones().subscribe((respuesta: any) => {
      this.ingresos = respuesta.ingresos;
      this.egresos = respuesta.egresos;
      this.usuarios = respuesta.usuarios;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  agregar(dato: any){
    const body = {
      tipo: this.seleccion,
      idUsuario: dato
    }
    this.servicio.agregar(body).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Usuario agregado correctamente');
      this.generales.cerrarModal();
      this.mostrar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  quitar(dato: any){
    this.servicio.quitar(dato).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Usuario eliminado correctamente');
      this.mostrar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
