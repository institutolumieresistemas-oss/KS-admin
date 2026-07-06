import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioMetasComponent } from './inicio-metas/inicio-metas.component';
import { InicioEventosComponent } from './inicio-eventos/inicio-eventos.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { InicioGeneralComponent } from './inicio-general/inicio-general.component';



@NgModule({
  declarations: [
    InicioMetasComponent,
    InicioEventosComponent,
    InicioGeneralComponent,
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ],
  exports: [
    InicioEventosComponent,
    InicioMetasComponent,
    InicioGeneralComponent
  ]
})
export class IniciosModule { }
