import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { ModulosService } from '../../servicios/modulos.service';
import { OpcionesService } from '../../servicios/opciones.service';

@Component({
    selector: 'app-modulos',
    templateUrl: './modulos.component.html',
    styleUrl: './modulos.component.css',
    standalone: false
})
export class ModulosComponent {
  datos: any;
  vista = '';
  seleccion: any;
  constructor(private generales: GeneralesService, private servicio: ModulosService, private service: OpcionesService){}

  ngOnInit(){
    this.mostrar();
  }

  modal(vista: any){
    this.vista = '';
    this.generales.delay(500).then(fun => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }

  mostrar(){
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.datos = respuesta;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  modulo(body: any){
    this.servicio.nuevo(body).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Modulo agregado correctamente');
      this.mostrar();
      this.generales.cerrarModal();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  opcion(body: any){
    body.idModulo = this.seleccion.id;
    this.service.nuevo(body).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Opcion agregada correctamente');
      this.mostrar();
      this.generales.cerrarModal();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
