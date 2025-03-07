import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetasComponent } from './metas/metas.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { ModalMetaComponent } from './metas/modales/modal-meta/modal-meta.component';



@NgModule({
  declarations: [
    MetasComponent,
    ModalMetaComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ]
})
export class VentasModule { }
