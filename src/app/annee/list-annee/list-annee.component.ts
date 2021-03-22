import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {catchError, map, startWith} from "rxjs/operators";
import {DataStateEnum} from "../../state/app.state";
import {of} from "rxjs";
import {AddUtilisateurComponent} from "../../utilisateur/add-utilisateur/add-utilisateur.component";
import {Client} from "../../model/client";
import {AnneeService} from "../../service/annee.service";
import {Annee} from "../../model/annee";
import {AddAnneeComponent} from "../add-annee/add-annee.component";

@Component({
  selector: 'app-list-annee',
  templateUrl: './list-annee.component.html',
  styleUrls: ['./list-annee.component.css']
})
export class ListAnneeComponent implements OnInit {

  public constructor(public anneeService: AnneeService, public router: Router,
                     private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
                     public dialogRef: MatDialogRef<AddAnneeComponent>) {
  }

  ngOnInit(): void {
    if (this.anneeService.choixmenu === "A") {
      this.anneeService.initAnnee();
      this.anneeService.initForm(this.anneeService.annee);
    }
    this.getAll();
  }

  public getAll() {
    this.anneeService.listAnnee$ = this.anneeService.getAll().pipe(
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
    this.anneeService.listAnnee$ = this.anneeService.getByEtat(etat).pipe(
      map(datas => {
        return ({dataState: DataStateEnum.LOADED, data: datas});
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})));
  }

  onPrepareNew(): void {
    this.anneeService.choixmenu = "Create";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.anneeService.initAnnee();
    this.anneeService.initForm(this.anneeService.annee);
    this.matDialog.open(AddAnneeComponent, dialogConfig);
  }

  selectData(item: Client): void {

  }

  onSearch(dataFormSearch: any): void {
    /*this.utilisateurService.listUtilisateur$ = this.utilisateurService.findByNomOrPrenom(dataFormSearch.keyword).pipe(
      map(datas => {
        return ({dataState: DataStateEnum.LOADED, data: datas});
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})));*/
  }

  onSelect(a: Annee): void {
    /*this.anneeService.annee = a;
    this.anneeService.changeEtat(u).subscribe(data => {
      u.actif = data.actif;
    });*/
  }

  onDelete(a: Annee): void {
    let action = confirm("Etes vous sur de vouloir supprimer ?");
    if (action === true) {
      this.anneeService.delete(a.idannee).subscribe(data => {
        alert("Supprimé avec succès");
      });
    }
  }

  onPrepareEdit(a: Annee) {
    this.anneeService.annee = a;
    this.anneeService.choixmenu = "Edit";
    this.anneeService.anneeFormGroup = this.anneeService.fb.group(Object.assign({}, a));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.matDialog.open(AddAnneeComponent, dialogConfig);
  }

}
