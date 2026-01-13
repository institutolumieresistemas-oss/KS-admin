import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetasEventosComponent } from './metas-eventos/metas-eventos.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { ModalMetaEventoComponent } from './metas-eventos/modales/modal-meta-evento/modal-meta-evento.component';
import { MetasIngresosComponent } from './metas-ingresos/metas-ingresos.component';
import { ModalMetaIngresoComponent } from './metas-ingresos/modales/modal-meta-ingreso/modal-meta-ingreso.component';



@NgModule({
  declarations: [
    MetasEventosComponent,
    ModalMetaEventoComponent,
    MetasIngresosComponent,
    ModalMetaIngresoComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ]
})
export class MetasModule { }
