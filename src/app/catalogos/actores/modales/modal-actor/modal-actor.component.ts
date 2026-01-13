import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { datatableConfig } from '../../../../interfaces/tables.interface';

@Component({
  selector: 'app-modal-actor',
  templateUrl: './modal-actor.component.html',
  styleUrl: './modal-actor.component.css',
  standalone: false
})
export class ModalActorComponent implements OnInit {

  configuracion: datatableConfig = {
    alias: ['Nombre'],
    encabezados: ['nombre'],
    busqueda: true
  };

  @Output() emitidor = new EventEmitter<any>();

  @Input() dato: any = {
    nombre: '',
    personajes: [],
    personajesDatos: []
  };

  @Input() lista: any[] = [];
  @Input() modificar = false;

  datos: any[] = [];
  seleccion: any;

  constructor(private generales: GeneralesService) {}

  ngOnInit(): void {
    // ✅ Cargar personajes ya asignados al actor
    if (this.dato.personajesDatos?.length) {
      this.datos = [...this.dato.personajesDatos];
    }

    // fallback por si solo viene el array de IDs
    else if (this.dato.personajes?.length) {
      this.datos = this.lista.filter(p =>
        this.dato.personajes.includes(p.id.toString())
      );
    }
  }

  eliminar(personaje: any) {
    this.dato.personajes = this.dato.personajes.filter(
      (id: any) => id.toString() !== personaje.id.toString()
    );

    this.datos = this.datos.filter(
      (p: any) => p.id.toString() !== personaje.id.toString()
    );
  }

  agregar(id: any) {
    if (!id) return;

    const personaje = this.lista.find(
      (p: any) => p.id.toString() === id.toString()
    );

    if (!personaje) return;

    if (this.dato.personajes.includes(id)) {
      this.generales.mensajeError('Este personaje ya fue agregado');
      return;
    }

    this.dato.personajes.push(id);
    this.datos.push(personaje);
  }

  emitir() {
    this.emitidor.emit(this.dato);
  }

  cerrar() {
    this.generales.cerrarModal();
  }
}
