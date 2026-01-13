import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { EventosService } from '../../servicios/eventos.service';
import { GeneralesService } from '../../servicios/generales.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-eventos',
    templateUrl: './eventos.component.html',
    styleUrl: './eventos.component.css',
    standalone: false
})
export class EventosComponent {
  configuracion: datatableConfig = {
    alias: ['Folio','Festejado', 'Contrato', 'Celular', 'Fecha'],
    encabezados: ['folio', 'festejado', 'nombre', 'celular', 'fecha'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  listas: any
  opciones = [
    { id: 0, nombre: 'Activo' },
    { id: 1, nombre: 'Finalizado' },
    { id: 2, nombre: 'Cancelado' }
  ]
  constructor(private generales: GeneralesService, private servicio: EventosService, private router: Router){}
  
  ngOnInit(): void {
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
    this.cargando = true;
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta.datos;
      this.listas = respuesta.listas;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    this.cargando = true;
    this.servicio.nuevo(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Evento agregado correctamente');
      this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
      this.generales.cerrarModal();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  cambiarEstatus(estatus: any){
    const body = {
      id: this.seleccion.id,
      estatus: estatus
    }
    this.servicio.actualizarestatus(body).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Estatus actualizado correctamente');
      this.mostrar();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  actualizarLider(dato: any){
    this.seleccion.lider = dato;
    this.servicio.actualizarLider(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.mostrar();
      this.generales.cerrarModal();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  actualizarEquipo(dato: any){
    this.seleccion.equipo = dato;
    this.servicio.actualizarEquipo(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.mostrar();
      this.generales.cerrarModal();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  estado(){
    this.router.navigate(['admin/estadocuenta', this.seleccion.id]);
  }
}
