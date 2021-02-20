import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUtilisateurComponent } from './utilisateur/list-utilisateur/list-utilisateur.component';
import { AddUtilisateurComponent } from './utilisateur/add-utilisateur/add-utilisateur.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { ListVersementComponent } from './versement/list-versement/list-versement.component';
import { AddVersementComponent } from './versement/add-versement/add-versement.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUtilisateurComponent,
    AddUtilisateurComponent,
    ListClientComponent,
    AddClientComponent,
    ListVersementComponent,
    AddVersementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
