import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-configuracion-inicio',
  standalone: false,
  templateUrl: './modal-configuracion-inicio.component.html',
  styleUrl: './modal-configuracion-inicio.component.css'
})
export class ModalConfiguracionInicioComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() lista: any;
  @Input() listado: any;
  final: any;
  dato = 0;
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
    this.final = this.generales.faltantes(this.listado, this.lista, 'idTipo');
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
