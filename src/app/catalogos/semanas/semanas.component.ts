import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { SemanasService } from '../../servicios/semanas.service';
import { datatableConfig } from '../../interfaces/tables.interface';

@Component({
    selector: 'app-semanas',
    templateUrl: './semanas.component.html',
    styleUrl: './semanas.component.css',
    standalone: false
})
export class SemanasComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre', 'Inicio', 'Fin'],
    encabezados: ['nombre', 'inicio', 'fin'],
    busqueda: true
  };
  datos: any;
  seleccion: any;
  vista: any;
  lista: any;
  listado: any;
  busqueda = 0;
  
  constructor(private generales: GeneralesService, private servicio: SemanasService){}
  
  ngOnInit(): void {
    this.mostrar();
  }

  buscar(){
    this.listado = this.generales.sublista(this.datos, this.busqueda, 'idCalendario');
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
      this.datos = respuesta.datos;
      this.lista = respuesta.lista;
      this.buscar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    if(this.servicio.validar(dato)){
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Semana agregada correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      },
      error => {
        this.generales.interpretarError(error);
      });
    }
  }
}