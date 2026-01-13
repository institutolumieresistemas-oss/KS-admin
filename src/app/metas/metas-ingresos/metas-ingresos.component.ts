import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { MetasIngresosService } from '../../servicios/metas-ingresos.service';

@Component({
  selector: 'app-metas-ingresos',
  standalone: false,
  templateUrl: './metas-ingresos.component.html',
  styleUrl: './metas-ingresos.component.css'
})
export class MetasIngresosComponent {
  configuracion: datatableConfig = {
      alias: ['Usuario', 'Meta', 'Mes', 'Calendario'],
      encabezados: ['usuario', 'cantidad', 'mes', 'calendario'],
      busqueda: true
    };
    datos: any;
    cargando = false;
    seleccion: any;
    vista: any;
    listas = {
      usuarios: [],
      calendarios: []
    }
    constructor(private generales: GeneralesService, private servicio: MetasIngresosService){}
    
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
        this.generales.mensajeCorrecto('Meta agregada correctamente');
        this.mostrar();
        this.generales.cerrarModal();
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
}
