import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { ConfiguracionesService } from '../../servicios/configuraciones.service';
import { datatableConfig } from '../../interfaces/tables.interface';

@Component({
  selector: 'app-configuracion-inicio',
  standalone: false,
  templateUrl: './configuracion-inicio.component.html',
  styleUrl: './configuracion-inicio.component.css'
})
export class ConfiguracionInicioComponent {
  tipos: any;
  eventos = new Array();
  metas = new Array();
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
    this.servicio.inicio().subscribe((respuesta: any) => {
      this.eventos = respuesta.eventos;
      this.metas = respuesta.metas;
      this.tipos = respuesta.tipos;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  agregar(dato: any){
    const body = {
      tipo: this.seleccion,
      idTipo: dato
    }
    this.servicio.guardar(body).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Tipo agregado correctamente');
      this.generales.cerrarModal();
      this.mostrar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  quitar(dato: any){
    this.servicio.eliminar(dato).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Tipo eliminado correctamente');
      this.mostrar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
