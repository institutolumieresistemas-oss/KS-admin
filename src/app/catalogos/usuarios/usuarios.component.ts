import { Component } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { GeneralesService } from '../../servicios/generales.service';
import { datatableConfig } from '../../interfaces/tables.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre', 'Celular', 'Sucursal', 'Usuario', 'Tipo de usuario'],
    encabezados: ['nombre', 'celular', 'sucursal', 'usuario', 'tipo'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  listas = {
    tipos: [],
    sucursales: []
  }
  
  constructor(private generales: GeneralesService, private servicio: UsuariosService){}
  
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
      this.listas = respuesta.listas
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    if(this.servicio.validar(dato)){
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Usuario agregado correctamente');
        this.generales.cerrarModal();
        this.mostrar();
      },
      error => {
        this.generales.interpretarError(error);
      });
    }
  }

  
}
