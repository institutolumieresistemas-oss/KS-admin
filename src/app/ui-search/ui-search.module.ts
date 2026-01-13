import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargandoComponent } from './cargando/cargando.component';
import { MenuComponent } from './menu/menu.component';
import { LogoComponent } from './logo/logo.component';
import { ModuloComponent } from './modulo/modulo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogoResponsiveComponent } from './logo-responsive/logo-responsive.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { UsuarioMenuComponent } from './usuario-menu/usuario-menu.component';
import { CardComponent } from './card/card.component';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChecktimesComponent } from './checktimes/checktimes.component';
import { ModalComponent } from './modal/modal.component';
import { TablaComponent } from './tabla/tabla.component';
import { SelectComponent } from './select/select.component';
import { PaginadorComponent } from './paginador/paginador.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ImagenComponent } from './imagen/imagen.component';
import { EventoGraficoComponent } from './evento-grafico/evento-grafico.component';
import { ModalProgramarSalidaComponent } from './evento-grafico/modales/modal-programar-salida/modal-programar-salida.component';
import { NotificacionInvasivaComponent } from './notificacion-invasiva/notificacion-invasiva.component';
import { NotificacionIngresosRedComponent } from './notificacion-ingresos-red/notificacion-ingresos-red.component';
import { NotificacionEgresosRedComponent } from './notificacion-egresos-red/notificacion-egresos-red.component';
import { TopComponent } from './top/top.component';
import { CirculoComponent } from './circulo/circulo.component';
import { ModalEquipoEventoComponent } from './evento-grafico/modales/modal-equipo-evento/modal-equipo-evento.component';
import { ModalLiderEventoComponent } from './evento-grafico/modales/modal-lider-evento/modal-lider-evento.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';



@NgModule({
  declarations: [
    CargandoComponent,
    MenuComponent,
    LogoComponent,
    ModuloComponent,
    NavbarComponent,
    LogoResponsiveComponent,
    BusquedaComponent,
    MensajesComponent,
    NotificacionesComponent,
    UsuarioMenuComponent,
    CardComponent,
    InputComponent,
    ChecktimesComponent,
    ModalComponent,
    TablaComponent,
    SelectComponent,
    PaginadorComponent,
    TextareaComponent,
    ImagenComponent,
    EventoGraficoComponent,
    ModalProgramarSalidaComponent,
    NotificacionInvasivaComponent,
    NotificacionIngresosRedComponent,
    NotificacionEgresosRedComponent,
    TopComponent,
    CirculoComponent,
    ModalEquipoEventoComponent,
    ModalLiderEventoComponent,
    ProgressbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    CargandoComponent,
    MenuComponent,
    LogoComponent,
    NavbarComponent,
    InputComponent,
    ChecktimesComponent,
    ModalComponent,
    TablaComponent,
    SelectComponent,
    TextareaComponent,
    ImagenComponent,
    EventoGraficoComponent,
    NotificacionInvasivaComponent,
    NotificacionIngresosRedComponent,
    NotificacionEgresosRedComponent,
    TopComponent,
    CirculoComponent,
    ProgressbarComponent
  ]
})
export class UiSearchModule { }
