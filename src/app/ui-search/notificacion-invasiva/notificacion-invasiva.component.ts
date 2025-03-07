import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { NotificacionesService } from '../../servicios/notificaciones.service';

@Component({
  selector: 'app-notificacion-invasiva',
  templateUrl: './notificacion-invasiva.component.html',
  styleUrl: './notificacion-invasiva.component.css'
})
export class NotificacionInvasivaComponent {
  @Input() notificacion = {
    mensaje: '',
    titulo: '',
    botones: false,
    id: 0
  }
  @Output() resuelto = new EventEmitter();
  @Output() rechazado = new EventEmitter();
  constructor(private generales: GeneralesService, private servicio: NotificacionesService){}

  ngOnInit(){
  }

  resolver(){
    this.resuelto.emit(1);
  }

  rechazar(){
    this.rechazado.emit(0);
  }
}
