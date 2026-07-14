import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioMetasComponent } from './inicio-metas/inicio-metas.component';
import { InicioEventosComponent } from './inicio-eventos/inicio-eventos.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { InicioGeneralComponent } from './inicio-general/inicio-general.component';
import { InformacionEventoComponent } from './informacion-evento/informacion-evento.component';



@NgModule({
  declarations: [
    InicioMetasComponent,
    InicioEventosComponent,
    InicioGeneralComponent,
  ],
  imports: [
    CommonModule,
    UiSearchModule,
    InformacionEventoComponent
  ],
  exports: [
    InicioEventosComponent,
    InicioMetasComponent,
    InicioGeneralComponent,
    InformacionEventoComponent
  ]
})
export class IniciosModule { }
