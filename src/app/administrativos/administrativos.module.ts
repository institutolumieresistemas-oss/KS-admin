import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresosComponent } from './ingresos/ingresos.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { ModalIngresoComponent } from './ingresos/modales/modal-ingreso/modal-ingreso.component';
import { EgresosComponent } from './egresos/egresos.component';
import { ModalEgresoComponent } from './egresos/modales/modal-egreso/modal-egreso.component';
import { EventosComponent } from './eventos/eventos.component';
import { ModalEventoComponent } from './eventos/modales/modal-evento/modal-evento.component';
import { DatosClienteComponent } from './eventos/componentes/datos-cliente/datos-cliente.component';
import { DatosEmpresaComponent } from './eventos/componentes/datos-empresa/datos-empresa.component';
import { DatosPersonajesComponent } from './eventos/componentes/datos-personajes/datos-personajes.component';
import { ModalLiderComponent } from './eventos/modales/modal-lider/modal-lider.component';
import { ModalEquipoComponent } from './eventos/modales/modal-equipo/modal-equipo.component';
import { PrincipalComponent } from './principal/principal.component';
import { EstadoCuentaEventoComponent } from './estado-cuenta-evento/estado-cuenta-evento.component';
import { ModalAbonoComponent } from './estado-cuenta-evento/modales/modal-abono/modal-abono.component';
import { ModalGastoComponent } from './estado-cuenta-evento/modales/modal-gasto/modal-gasto.component';
import { ModalNominasEventosComponent } from './estado-cuenta-evento/modales/modal-nominas-eventos/modal-nominas-eventos.component';
import { IniciosModule } from '../inicios/inicios.module';
import { CajaComponent } from './caja/caja.component';
import { ValesComponent } from './vales/vales.component';
import { ModalValeComponent } from './vales/modales/modal-vale/modal-vale.component';
import { RecepcionValesComponent } from './recepcion-vales/recepcion-vales.component';
import { TransferenciasComponent } from './transferencias/transferencias.component';
import { ModalTransferenciaComponent } from './transferencias/modales/modal-transferencia/modal-transferencia.component';
import { RecepcionTransferenciasComponent } from './recepcion-transferencias/recepcion-transferencias.component';
import { FinalizadosComponent } from './finalizados/finalizados.component';
import { CalendarioEventosComponent } from './calendario-eventos/calendario-eventos.component';
import { ProgramacionEventosComponent } from './programacion-eventos/programacion-eventos.component';



@NgModule({
  declarations: [
    IngresosComponent,
    ModalIngresoComponent,
    EgresosComponent,
    ModalEgresoComponent,
    EventosComponent,
    ModalEventoComponent,
    DatosClienteComponent,
    DatosEmpresaComponent,
    DatosPersonajesComponent,
    ModalLiderComponent,
    ModalEquipoComponent,
    PrincipalComponent,
    EstadoCuentaEventoComponent,
    ModalAbonoComponent,
    ModalGastoComponent,
    ModalNominasEventosComponent,
    CajaComponent,
    ValesComponent,
    ModalValeComponent,
    RecepcionValesComponent,
    TransferenciasComponent,
    ModalTransferenciaComponent,
    RecepcionTransferenciasComponent,
    FinalizadosComponent,
    CalendarioEventosComponent,
    ProgramacionEventosComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule,
    IniciosModule
  ],
  exports: [
    ModalEquipoComponent,
    ModalLiderComponent,
    ModalIngresoComponent,
    ModalEgresoComponent
  ]
})
export class AdministrativosModule { }
