import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {AddClientComponent} from "../../client/add-client/add-client.component";
import {catchError, map, startWith} from "rxjs/operators";
import {DataStateEnum} from "../../state/app.state";
import {of} from "rxjs";
import {Client} from "../../model/client";
import {UtilisateurService} from "../../service/utilisateur.service";
import {AddUtilisateurComponent} from "../add-utilisateur/add-utilisateur.component";
import {Utilisateur} from "../../model/utilisateur";

@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.css']
})
export class ListUtilisateurComponent implements OnInit {

  public constructor(public utilisateurService: UtilisateurService, public router: Router,
                     private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
                     public dialogRef: MatDialogRef<AddClientComponent>) {
  }

  ngOnInit(): void {
    if (this.utilisateurService.choixmenu === "A") {
      this.utilisateurService.initUtilisateur();
      this.utilisateurService.initForm(this.utilisateurService.utilisateur);
    }
    this.getAll();
  }

  public getAll() {
    this.utilisateurService.listUtilisateur$ = this.utilisateurService.getAll().pipe(
      map(datas => {
        return ({dataState: DataStateEnum.LOADED, data: datas});
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})));
  }

  public getSelected() {
    this.getByEtat(true);
  }

  public getUnSelected(): void {
    this.getByEtat(false);
  }

  getByEtat(etat: boolean): void {
    this.utilisateurService.listUtilisateur$ = this.utilisateurService.getByEtat(etat).pipe(
      map(datas => {
        return ({dataState: DataStateEnum.LOADED, data: datas});
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})));
  }

  onPrepareNew(): void {
    this.utilisateurService.choixmenu = "Create";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.utilisateurService.initUtilisateur();
    this.utilisateurService.initForm(this.utilisateurService.utilisateur);
    this.matDialog.open(AddUtilisateurComponent, dialogConfig);
  }

  selectData(item: Client): void {

  }

  onSearch(dataFormSearch: any): void {
    this.utilisateurService.listUtilisateur$ = this.utilisateurService.findByNomOrPrenom(dataFormSearch.keyword).pipe(
      map(datas => {
        return ({dataState: DataStateEnum.LOADED, data: datas});
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})));
  }

  onSelect(u: Utilisateur): void {
    this.utilisateurService.utilisateur = u;
    this.utilisateurService.changeEtat(u).subscribe(data => {
      u.actif = data.actif;
    });
  }

  onDelete(u: Utilisateur): void {
    let action = confirm("Etes vous sur de vouloir supprimer ?");
    if (action === true) {
      this.utilisateurService.delete(u.idUtilisateur).subscribe(data => {
        alert("Supprimé avec succès");
      });
    }
  }

  onPrepareEdit(u: Utilisateur) {
    this.utilisateurService.utilisateur = u;
    this.utilisateurService.choixmenu = "Edit";
    this.utilisateurService.utilisateurFormGroup = this.utilisateurService.fb.group(Object.assign({}, u));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.matDialog.open(AddUtilisateurComponent, dialogConfig);
  }

  onResetPassword(u: Utilisateur) {
    let action = confirm("Voulez vous réinitialiser ce mot de passe ?");
    if (action) {
      this.utilisateurService.resetPassword(u).subscribe(data => {
        u.password = data.password;
      }, error => {
        console.log(error);
      });
    }
  }
}
