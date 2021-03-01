import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListClientComponent} from "./client/list-client/list-client.component";
import {ListUtilisateurComponent} from "./utilisateur/list-utilisateur/list-utilisateur.component";
import {ListVersementComponent} from "./versement/list-versement/list-versement.component";
import {ListRetraitComponent} from "./retrait/list-retrait/list-retrait.component";
import {TemplatComponent} from "./templat/templat.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: '', component: TemplatComponent, children: [
      {path: 'clients', component: ListClientComponent},
      {path: 'utilisateurs', component: ListUtilisateurComponent},
      {path: 'versements', component: ListVersementComponent},
      {path: 'retraits', component: ListRetraitComponent}
    ]
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
