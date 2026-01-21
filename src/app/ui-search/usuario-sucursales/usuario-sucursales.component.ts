import { Component, Input, SimpleChanges } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
  selector: 'app-usuario-sucursales',
  standalone: false,
  templateUrl: './usuario-sucursales.component.html',
  styleUrl: './usuario-sucursales.component.css'
})
export class UsuarioSucursalesComponent {
  @Input() seleccionada = {
    id: 0,
    nombre: 'No asignada'
  };
  @Input() asignadas : any;
  restantes: any;

  constructor(private generales: GeneralesService){}

  ngOnInit(){
    this.faltantes();
  }

  ngOnChanges(changes: SimpleChanges){
    this.faltantes();
  }

  faltantes(){
    this.restantes = this.generales.restantes(this.asignadas, this.seleccionada.id);
  }

  seleccionarSucursal(sucursal: any){
    localStorage.setItem('asigno', '1');
    localStorage.setItem('asignada', sucursal.id);
    localStorage.setItem('sucursal', sucursal.id);
    this.seleccionada = this.generales.dato(this.asignadas, sucursal.id);
    this.faltantes();
    window.location.reload();
  }
}
