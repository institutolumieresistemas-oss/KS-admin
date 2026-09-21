import { Component, Input, SimpleChanges } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
  selector: 'app-usuario-sucursales',
  standalone: false,
  templateUrl: './usuario-sucursales.component.html',
  styleUrl: './usuario-sucursales.component.css'
})
export class UsuarioSucursalesComponent {
  @Input() seleccionada: any = {
    id: 0,
    nombre: 'No asignada'
  };
  @Input() asignadas: any;
  restantes: any = [];

  constructor(private generales: GeneralesService){}

  ngOnInit(){
    this.faltantes();
  }

  ngOnChanges(changes: SimpleChanges){
    this.faltantes();
  }

  faltantes(){
    if (!this.seleccionada) {
      this.seleccionada = {
        id: 0,
        nombre: 'No asignada'
      };
    }
    const id = this.seleccionada?.id ?? 0;
    if (this.asignadas && Array.isArray(this.asignadas)) {
      this.restantes = this.generales.restantes(this.asignadas, id) || [];
    } else {
      this.restantes = [];
    }
  }

  seleccionarSucursal(sucursal: any){
    if (!sucursal) return;
    localStorage.setItem('asigno', '1');
    localStorage.setItem('asignada', sucursal.id);
    localStorage.setItem('sucursal', sucursal.id);
    this.seleccionada = this.generales.dato(this.asignadas, sucursal.id) || sucursal;
    this.faltantes();
    window.location.reload();
  }
}
