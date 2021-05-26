import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {AddClientComponent} from "../../client/add-client/add-client.component";
import {catchError, map, startWith} from "rxjs/operators";
import {DataStateEnum} from "../../state/app.state";
import {of} from "rxjs";
import {MoisService} from "../../service/mois.service";
import {AddMoisComponent} from "../add-mois/add-mois.component";
import {AnneeMois} from "../../model/anneeMois";
import {AnneeService} from "../../service/annee.service";

@Component({
  selector: 'app-list-mois',
  templateUrl: './list-mois.component.html',
  styleUrls: ['./list-mois.component.css']
})
export class ListMoisComponent implements OnInit {

  public constructor(public moisService: MoisService, public router: Router,
                     private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
                     public dialogRef: MatDialogRef<AddMoisComponent>,
                     private anneeService: AnneeService) {
  }

  ngOnInit(): void {
    if (this.moisService.choixmenu === "A") {
      this.moisService.initForm(this.moisService.mois);
    }
    this.getAllMois();
  }

  getAllAnnee(): void {
    this.anneeService.getByEtat(true).subscribe(data => {
      this.moisService.listAnnee = data;
    }, error => {
      console.log(error);
    });
  }

  public getAllMois() {
    this.moisService.listMois$ = this.moisService.getAll().pipe(
      map(datas => {
        return ({dataState: DataStateEnum.LOADED, data: datas});
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})));
  }

  public getSelectedMois() {
    this.getMoisByEtat(true);
  }

  public getUnSelectedClient(): void {
    this.getMoisByEtat(false);
  }

  getMoisByEtat(etat: boolean): void {
    this.moisService.listMois$ = this.moisService.getByEtat(etat).pipe(
      map(datas => {
        return ({dataState: DataStateEnum.LOADED, data: datas});
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})));
  }


  onPrepareNew(): void {
    this.moisService.choixmenu = "Create";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.moisService.initMois();
    this.moisService.initForm(this.moisService.mois);
    this.getAllAnnee();
    this.matDialog.open(AddMoisComponent, dialogConfig);
  }

  selectData(item: AnneeMois): void {

  }

  onSearch(dataFormSearch: any): void {
    /*this.clientService.listClients$ = this.clientService.findByNomOrPrenom(dataFormSearch.keyword).pipe(
      map(datas => {
        return ({dataState: DataStateEnum.LOADED, data: datas});
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})));*/
  }

  onSelect(a: AnneeMois): void {
    this.moisService.mois = a;
    //this.moisService.annee = a.annee;
    /*this.moisService.mois_ = a.mois;
    this.moisService.changeEtatClient(c).subscribe(data => {
      c.etat = data.etat;
    });*/
  }

  onDelete(a: AnneeMois): void {
    let action = confirm("Etes vous sur de vouloir supprimer ?");
    if (action === true) {
      this.moisService.delete(a.id).subscribe(data => {
        alert("Supprimé avec succès");
      });
    }
  }

  onPrepareEdit(a: AnneeMois) {
    this.moisService.annee = a.annee;
    this.moisService.mois_ = a.mois;
    this.moisService.choixmenu = "Edit";
    this.moisService.moisFormGroup = this.moisService.fb.group(Object.assign({}, a));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.matDialog.open(AddMoisComponent, dialogConfig);
  }

}
