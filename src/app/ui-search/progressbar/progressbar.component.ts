import { Component, Input, SimpleChanges } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
  selector: 'app-progressbar',
  standalone: false,
  templateUrl: './progressbar.component.html',
  styleUrl: './progressbar.component.css'
})
export class ProgressbarComponent {
  @Input() meta: any;
  @Input() titulo: any;

  seleccion: any = null;
  porcentaje = 0;
  bg = 'bg-info';
  activo = false;

  constructor(public generales: GeneralesService) {}

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['meta'] && this.meta) {
      this.seleccion = this.meta;
      this.calcularPorcentajes();
    }
  }

  calcularPorcentajes(): void {

    // Validaciones defensivas
    if (!this.seleccion) {
      return;
    }

    if (!this.seleccion.meta || this.seleccion.meta <= 0) {
      this.porcentaje = 0;
      this.bg = 'bg-danger';
      return;
    }

    this.porcentaje = Math.floor(
      (this.seleccion.cantidad * 100) / this.seleccion.meta
    );

    if (this.porcentaje < 50) {
      this.bg = 'bg-danger';
    } else if (this.porcentaje < 100) {
      this.bg = 'bg-warning';
    } else {
      this.bg = 'bg-success';
    }
  }
}
