import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { PermisosComponent } from './permisos/permisos.component';



@NgModule({
  declarations: [
    PermisosComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ]
})
export class DirectivosModule { }
