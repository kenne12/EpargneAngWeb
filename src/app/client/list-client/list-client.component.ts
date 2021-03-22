import {Component, Inject, OnInit} from '@angular/core';
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {AddClientComponent} from "../add-client/add-client.component";
import {catchError, map, startWith} from "rxjs/operators";
import {DataStateEnum} from "../../state/app.state";
import {of} from "rxjs";

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  public constructor(public clientService: ClientService, public router: Router,
                     private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
                     public dialogRef: MatDialogRef<AddClientComponent>) {
  }

  ngOnInit(): void {
    if (this.clientService.choixmenu === "A") {
      this.clientService.initForm();
    }
    this.getAllClient();
    this.clientService.getAllProfession().subscribe(data => {
      this.clientService.listProfession = data;
    }, error => {
      console.log(error);
    });
  }

  public getAllClient() {
    this.clientService.listClients$ = this.clientService.getAll().pipe(
      map(datas => {
        return ({dataState: DataStateEnum.LOADED, data: datas});
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})));
  }

  public getSelectedClient() {
    this.getClientByEtat(true);
  }

  public getUnSelectedClient(): void {
    this.getClientByEtat(false);
  }

  getClientByEtat(etat: boolean): void {
    this.clientService.listClients$ = this.clientService.getClientByEtat(etat).pipe(
      map(datas => {
        return ({dataState: DataStateEnum.LOADED, data: datas});
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})));
  }

  getClientBySoldeZero(): void {
    this.clientService.listClients$ = this.clientService.getClientBySoldeZero().pipe(
      map(datas => {
        return ({dataState: DataStateEnum.LOADED, data: datas});
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})));
  }

  getClientBySoldeGthZero(): void {
    this.clientService.listClients$ = this.clientService.getClientBySoldeGthZero().pipe(
      map(datas => {
        return ({dataState: DataStateEnum.LOADED, data: datas});
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})));
  }

  onPrepareNewClient(): void {
    this.clientService.choixmenu = "Create";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.clientService.initClient();
    this.clientService.initForm();
    this.matDialog.open(AddClientComponent, dialogConfig);
  }

  selectData(item: Client): void {

  }

  onSearch(dataFormSearch: any): void {
    this.clientService.listClients$ = this.clientService.findByNomOrPrenom(dataFormSearch.keyword).pipe(
      map(datas => {
        return ({dataState: DataStateEnum.LOADED, data: datas});
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})));
  }

  onSelect(c: Client): void {
    this.clientService.client = c;
    this.clientService.changeEtatClient(c).subscribe(data => {
      c.etat = data.etat;
    });
  }

  onDeleteClient(c: Client): void {
    let action = confirm("Etes vous sur de vouloir supprimer ?");
    if (action === true) {
      this.clientService.deleteClient(c.idclient).subscribe(data => {
        alert("Supprimé avec succès");
      });
    }
  }

  onPrepareEditClient(c: Client) {
    this.clientService.client = c;
    this.clientService.choixmenu = "Edit";
    this.clientService.clientFormGroup = this.clientService.fb.group(Object.assign({}, c));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.matDialog.open(AddClientComponent, dialogConfig);
  }
}
