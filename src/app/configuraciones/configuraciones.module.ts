import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { ConfiguracionesNotificacionesComponent } from './configuraciones-notificaciones/configuraciones-notificaciones.component';
import { ModalUsuariosNotificacionComponent } from './configuraciones-notificaciones/modales/modal-usuarios-notificacion/modal-usuarios-notificacion.component';
import { ConfiguracionInicioComponent } from './configuracion-inicio/configuracion-inicio.component';
import { ModalConfiguracionInicioComponent } from './configuracion-inicio/modales/modal-configuracion-inicio/modal-configuracion-inicio.component';



@NgModule({
  declarations: [
    ConfiguracionesNotificacionesComponent,
    ModalUsuariosNotificacionComponent,
    ConfiguracionInicioComponent,
    ModalConfiguracionInicioComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ]
})
export class ConfiguracionesModule { }
