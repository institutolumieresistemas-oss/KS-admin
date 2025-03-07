import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { auntenticacionGuard } from './guardianes/autenticacion.guard';
import { logoutGuard } from './guardianes/logout.guard';
import { LoginComponent } from './home/login/login.component';

const routes: Routes = [
  {path: "admin", canActivate: [auntenticacionGuard],
  loadChildren: () => import("./home/home.module").then(m => m.HomeModule)},
  {path: "login", canActivate: [logoutGuard], component: LoginComponent},
  {path: "**", redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
