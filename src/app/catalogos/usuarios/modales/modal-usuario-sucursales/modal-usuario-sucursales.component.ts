import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { UsuarioSucursalesService } from '../../../../servicios/usuario-sucursales.service';

@Component({
  selector: 'app-modal-usuario-sucursales',
  standalone: false,
  templateUrl: './modal-usuario-sucursales.component.html',
  styleUrl: './modal-usuario-sucursales.component.css'
})
export class ModalUsuarioSucursalesComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() datos: any;
  @Input() sucursales: any;
  asignadas: any;
  restantes: any;
  body = {
    idUsuario: 0,
    idSucursal: 0
  }
  constructor(private generales: GeneralesService, private servicio: UsuarioSucursalesService) { }
  
  ngOnInit(): void {
    this.body.idUsuario = this.datos.id;
    this.asignadas = this.datos.asignadas;
    this.faltantes();
  }

  faltantes(){
    this.restantes = this.generales.obtenerRestantes(this.sucursales, this.asignadas);
  }

  asignar(){
    if(this.servicio.validar(this.body)){
      this.servicio.asignar(this.body).subscribe((respuesta: any) => {
        const asignada = this.generales.dato(this.sucursales, this.body.idSucursal);
        this.asignadas = this.generales.agregarDatoArray(this.asignadas, asignada);
        this.faltantes();
        this.body.idSucursal = 0;
        this.generales.mensajeCorrecto('Sucursal asignada correctamente');
      },
      error => {
        this.generales.interpretarError(error);
      });
    }
  }

  retirar(){
    if(this.servicio.validar(this.body)){
      this.servicio.retirar(this.body).subscribe((respuesta: any) => {
        const asignada = this.generales.dato(this.sucursales, this.body.idSucursal);
        this.asignadas = this.generales.eliminarDatoArray(this.asignadas, asignada);
        this.faltantes();
        this.body.idSucursal = 0;
        this.generales.mensajeCorrecto('Sucursal eliminada correctamente');

      },
      error => {
        this.generales.interpretarError(error);
      });
    }
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
