import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ListUtilisateurComponent} from './utilisateur/list-utilisateur/list-utilisateur.component';
import {AddUtilisateurComponent} from './utilisateur/add-utilisateur/add-utilisateur.component';
import {ListClientComponent} from './client/list-client/list-client.component';
import {AddClientComponent} from './client/add-client/add-client.component';
import {ListVersementComponent} from './versement/list-versement/list-versement.component';
import {AddVersementComponent} from './versement/add-versement/add-versement.component';
import {AddRetraitComponent} from './retrait/add-retrait/add-retrait.component';
import {ListRetraitComponent} from './retrait/list-retrait/list-retrait.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatSliderModule} from "@angular/material/slider";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {DatePipe} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {TemplatComponent} from './templat/templat.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BasicAuthInterceptor} from "./service/basic-auth.interceptor";
import {ErrorInterceptor} from "./service/error.interceptor";
import { ListAnneeComponent } from './annee/list-annee/list-annee.component';
import { AddAnneeComponent } from './annee/add-annee/add-annee.component';
import { ListMoisComponent } from './mois/list-mois/list-mois.component';
import { AddMoisComponent } from './mois/add-mois/add-mois.component';


const MATERIAL_MODULES = [MatToolbarModule,
  MatIconModule
];

@NgModule({
  declarations: [
    AppComponent,
    ListUtilisateurComponent,
    AddUtilisateurComponent,
    ListClientComponent,
    AddClientComponent,
    ListVersementComponent,
    AddVersementComponent,
    AddRetraitComponent,
    ListRetraitComponent,
    TemplatComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ListAnneeComponent,
    AddAnneeComponent,
    ListMoisComponent,
    AddMoisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSliderModule,
    MatIconModule,
    MatDividerModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: MATERIAL_MODULES,
  providers: [DatePipe, {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: MatDialogRef, useValue: {}}],
  bootstrap: [AppComponent],
  entryComponents: [ListUtilisateurComponent]
})
export class AppModule {
}
