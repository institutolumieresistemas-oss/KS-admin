import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioMetasComponent } from './inicio-metas/inicio-metas.component';
import { InicioEventosComponent } from './inicio-eventos/inicio-eventos.component';
import { UiSearchModule } from '../ui-search/ui-search.module';



@NgModule({
  declarations: [
    InicioMetasComponent,
    InicioEventosComponent,
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ],
  exports: [
    InicioEventosComponent,
    InicioMetasComponent
  ]
})
export class IniciosModule { }
