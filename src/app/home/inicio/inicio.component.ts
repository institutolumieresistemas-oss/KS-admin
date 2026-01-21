import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.css',
    standalone: false
})
export class InicioComponent {
  menus: any;
  abierto = false;
  sucursales: any;
  sucursal: any;
  user: any;
  asignada: any;
  asignadas: any;
  constructor(private generales: GeneralesService,
              private usuarios: UsuariosService){}

  ngOnInit(): void {
    this.traerInformacion();
  }

  traerInformacion(){
    this.usuarios.informacion(localStorage.getItem('usuario')).subscribe((respuesta: any) => {
      const asigno = localStorage.getItem('asigno');
      localStorage.setItem('permisos', respuesta.usuario.idTipoUsuario);
      localStorage.setItem('foto', respuesta.usuario.foto);
      localStorage.setItem('identificador', respuesta.usuario.id);
      localStorage.setItem('nombre', respuesta.usuario.nombre);
      localStorage.setItem('calendario', respuesta.calendario);
      localStorage.setItem('sucursal', (asigno?.toString() === '1') ? localStorage.getItem('sucursal') : respuesta.usuario.idSucursal);
      localStorage.setItem('semana', respuesta.semana);
      localStorage.setItem('inicio', respuesta.inicio);
      
      this.menus = respuesta.permisos;
      this.sucursales = respuesta.sucursales;
      this.sucursal = respuesta.usuario.idSucursal;
      this.user = respuesta.usuario;
      this.asignadas = respuesta.usuario.asignadas;
      this.verificarSucursalAsignada();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  verificarSucursalAsignada(){
    const asigno = localStorage.getItem('asigno');
    if(asigno?.toString() === '1'){
      this.asignada = this.generales.dato(this.asignadas, localStorage.getItem('asignada'));
    }else{
      this.asignada = this.generales.dato(this.asignadas, this.sucursal);
    }
  }
}
