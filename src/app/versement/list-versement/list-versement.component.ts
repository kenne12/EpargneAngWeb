import {Component, OnInit} from '@angular/core';
import {catchError, map, startWith} from "rxjs/operators";
import {DataStateEnum} from "../../state/app.state";
import {of} from "rxjs";
import {VersementService} from "../../service/versement.service";
import {Versement} from "../../model/versement";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddVersementComponent} from "../add-versement/add-versement.component";

@Component({
  selector: 'app-list-versement',
  templateUrl: './list-versement.component.html',
  styleUrls: ['./list-versement.component.css']
})
export class ListVersementComponent implements OnInit {

  constructor(public versementService: VersementService, public matDialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.versementService.choixmenu === "A") {
      this.versementService.initVersement();
      this.versementService.initForm(this.versementService.versement);
    }
    this.getAllVersement();
  }

  private getClients(): void {
    this.versementService.getClientByEtat(true).subscribe(data => {
      this.versementService.listClients = data;
    }, error => {
      console.log(error);
    });
  }

  public getAllVersement() {
    this.versementService.listVersement$ = this.versementService.getAll().pipe(
      map(datas => {
        return ({dataState: DataStateEnum.LOADED, data: datas});
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})));
  }

  onPrepareNewVersement(): void {
    this.versementService.choixmenu = "Create";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.versementService.initVersement();
    this.versementService.initForm(this.versementService.versement);
    this.getClients();
    this.matDialog.open(AddVersementComponent, dialogConfig);
  }

  onPrepareEditVersement(v: Versement): void {
    this.versementService.choixmenu = "Edit";
    this.versementService.versement = v;
    this.versementService.client = v.client;
    this.versementService.initForm(v);

    //this.versementService.versementFormGroup = this.versementService.fb.group(Object.assign({}, v));
    this.getClients();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.matDialog.open(AddVersementComponent, dialogConfig);
  }

  onDeleteVersement(v: Versement): void {
    let action = confirm("Voulez vous vraiment supprimer le versement ?");
    if (action) {
      this.versementService.deleteVersement(v.idVersement).subscribe(datas => {
        this.versementService.versement = new Versement();
        console.log("Supprimé avec succès");
      });
    }
  }

  onSearch(value: any) {

  }
}
