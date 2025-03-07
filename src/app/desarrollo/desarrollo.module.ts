import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulosComponent } from './modulos/modulos.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { ModalModuloComponent } from './modulos/modales/modal-modulo/modal-modulo.component';
import { ModalOpcionComponent } from './modulos/modales/modal-opcion/modal-opcion.component';



@NgModule({
  declarations: [
    ModulosComponent,
    ModalModuloComponent,
    ModalOpcionComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ]
})
export class DesarrolloModule { }
