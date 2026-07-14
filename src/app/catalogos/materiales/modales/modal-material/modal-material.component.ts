import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-material',
  templateUrl: './modal-material.component.html',
  styleUrl: './modal-material.component.css',
  standalone: false
})
export class ModalMaterialComponent implements OnInit {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    folio: '',
    idTipo: 0
  };
  @Input() tipos: any[] = [];
  @Input() materiales: any[] = [];
  @Input() modificar = false;

  constructor(private generales: GeneralesService) {}

  ngOnInit(): void {}

  seleccionarTipo(idTipo: any) {
    this.dato.idTipo = idTipo;
    if (idTipo && idTipo !== 0 && idTipo !== '0') {
      const tipoSel = this.tipos.find(t => t.id.toString() === idTipo.toString());
      if (tipoSel && tipoSel.nombre) {
        const inicial = tipoSel.nombre.charAt(0).toUpperCase();
        const cantidad = this.materiales.filter(m => m.idTipo.toString() === idTipo.toString()).length;
        this.dato.folio = `${inicial}-${cantidad + 1}`;
      }
    } else {
      this.dato.folio = '';
    }
  }

  emitir() {
    if (!this.dato.folio) {
      this.generales.mensajeError('Debe ingresar un folio');
      return;
    }
    if (!this.dato.idTipo || this.dato.idTipo === 0) {
      this.generales.mensajeError('Debe seleccionar un tipo de material');
      return;
    }
    this.emitidor.emit(this.dato);
  }

  cerrar() {
    this.generales.cerrarModal();
  }
}
