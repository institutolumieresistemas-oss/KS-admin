import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { MetasEventosService } from '../../servicios/metas-eventos.service';

@Component({
  selector: 'app-metas-eventos',
  standalone: false,
  templateUrl: './metas-eventos.component.html',
  styleUrl: './metas-eventos.component.css'
})
export class MetasEventosComponent {
  configuracion: datatableConfig = {
    alias: ['Usuario', 'Meta', 'Mes', 'Calendario'],
    encabezados: ['usuario', 'cantidad', 'mes', 'calendario'],
    busqueda: true
  };
  datos: any;
  seleccion: any;
  vista: any;
  listas = {
    usuarios: [],
    calendarios: []
  }
  constructor(private generales: GeneralesService, private servicio: MetasEventosService){}
  
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
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.datos = respuesta.datos;
      this.listas = respuesta.listas;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    this.servicio.nuevo(dato).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Meta agregada correctamente');
      this.mostrar();
      this.generales.cerrarModal();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
  
}
