import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { auntenticacionGuard } from '../guardianes/autenticacion.guard';
import { ModulosComponent } from '../desarrollo/modulos/modulos.component';
import { TiposUsuarioComponent } from '../catalogos/tipos-usuario/tipos-usuario.component';
import { SucursalesComponent } from '../catalogos/sucursales/sucursales.component';
import { UsuariosComponent } from '../catalogos/usuarios/usuarios.component';
import { IngresorubrosComponent } from '../catalogos/ingresorubros/ingresorubros.component';
import { IngresoTiposComponent } from '../catalogos/ingreso-tipos/ingreso-tipos.component';
import { EgresoRubrosComponent } from '../catalogos/egreso-rubros/egreso-rubros.component';
import { EgresoTiposComponent } from '../catalogos/egreso-tipos/egreso-tipos.component';
import { PermisosComponent } from '../directivos/permisos/permisos.component';
import { FormasPagosComponent } from '../catalogos/formas-pagos/formas-pagos.component';
import { CalendariosComponent } from '../catalogos/calendarios/calendarios.component';
import { IngresosComponent } from '../administrativos/ingresos/ingresos.component';
import { EgresosComponent } from '../administrativos/egresos/egresos.component';
import { PaquetesComponent } from '../catalogos/paquetes/paquetes.component';
import { CuentasComponent } from '../catalogos/cuentas/cuentas.component';
import { MediosPublicitariosComponent } from '../catalogos/medios-publicitarios/medios-publicitarios.component';
import { MotivosComponent } from '../catalogos/motivos/motivos.component';
import { PersonajesComponent } from '../catalogos/personajes/personajes.component';
import { EventosComponent } from '../administrativos/eventos/eventos.component';
import { PrincipalComponent } from '../administrativos/principal/principal.component';
import { EstadoCuentaEventoComponent } from '../administrativos/estado-cuenta-evento/estado-cuenta-evento.component';
import { MetasComponent } from '../ventas/metas/metas.component';
import { ConfiguracionesNotificacionesComponent } from '../configuraciones/configuraciones-notificaciones/configuraciones-notificaciones.component';
import { SemanasComponent } from '../catalogos/semanas/semanas.component';

const routes: Routes = [
  {path: '', canActivate: [auntenticacionGuard], component: InicioComponent, children: [
    { path: '', canActivate: [auntenticacionGuard], component: PrincipalComponent },
    { path: 'modulos', canActivate: [auntenticacionGuard], component: ModulosComponent },
    { path: 'tiposUsuario', canActivate: [auntenticacionGuard], component: TiposUsuarioComponent },
    { path: 'sucursales', canActivate: [auntenticacionGuard], component: SucursalesComponent },
    { path: 'usuarios', canActivate: [auntenticacionGuard], component: UsuariosComponent },
    { path: 'rubrosIngresos', canActivate: [auntenticacionGuard], component: IngresorubrosComponent },
    { path: 'tiposIngresos', canActivate: [auntenticacionGuard], component: IngresoTiposComponent },
    { path: 'rubrosEgresos', canActivate: [auntenticacionGuard], component: EgresoRubrosComponent },
    { path: 'tiposEgresos', canActivate: [auntenticacionGuard], component: EgresoTiposComponent },
    { path: 'permisos', canActivate: [auntenticacionGuard], component: PermisosComponent },
    { path: 'formaspagos', canActivate: [auntenticacionGuard], component: FormasPagosComponent },
    { path: 'calendarios', canActivate: [auntenticacionGuard], component: CalendariosComponent },
    { path: 'ingresos', canActivate: [auntenticacionGuard], component: IngresosComponent },
    { path: 'egresos', canActivate: [auntenticacionGuard], component: EgresosComponent },
    { path: 'paquetes', canActivate: [auntenticacionGuard], component: PaquetesComponent },
    { path: 'cuentas', canActivate: [auntenticacionGuard], component: CuentasComponent },
    { path: 'mediospublicitarios', canActivate: [auntenticacionGuard], component: MediosPublicitariosComponent },
    { path: 'motivos', canActivate: [auntenticacionGuard], component: MotivosComponent },
    { path: 'personajes', canActivate: [auntenticacionGuard], component: PersonajesComponent },
    { path: 'eventos', canActivate: [auntenticacionGuard], component: EventosComponent },
    { path: 'metas', canActivate: [auntenticacionGuard], component: MetasComponent },
    { path: 'configuracionNotificaciones', canActivate: [auntenticacionGuard], component: ConfiguracionesNotificacionesComponent },
    { path: 'semanas', canActivate: [auntenticacionGuard], component: SemanasComponent },
    { path: 'estadocuenta/:evento', canActivate: [auntenticacionGuard], component: EstadoCuentaEventoComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
