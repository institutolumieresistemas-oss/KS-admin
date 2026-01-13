import { Component, Input } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
  selector: 'app-progressbar',
  standalone: false,
  templateUrl: './progressbar.component.html',
  styleUrl: './progressbar.component.css'
})
export class ProgressbarComponent {
  @Input() meta = {
    meta: 0,
    mes: '',
    cantidad: 0,
  }
  seleccion: any;
  porcentaje = 0;
  bg = 'bg-info';
  activo = false;
  @Input() titulo: any;
  constructor(public generales: GeneralesService) { }

  ngOnInit(): void {
    this.seleccion = this.meta;
    this.calcularPorcentajes();
  }

  calcularPorcentajes(){
    this.porcentaje = (this.seleccion.cantidad * 100) / this.seleccion.meta;
    this.porcentaje = parseInt(this.porcentaje.toString());
    if(this.porcentaje < 50){
      this.bg = 'bg-danger'
    }if(this.porcentaje >= 50 && this.porcentaje < 100){
      this.bg = 'bg-yellow';
    }else if(this.porcentaje >= 100){
      this.bg = 'bg-success';
    }
  }
}
