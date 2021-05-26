import {Component, OnInit} from '@angular/core';
import {catchError, map, startWith} from "rxjs/operators";
import {DataStateEnum} from "../../state/app.state";
import {of} from "rxjs";
import {VersementService} from "../../service/versement.service";
import {Versement} from "../../model/versement";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddVersementComponent} from "../add-versement/add-versement.component";
import {MoisService} from "../../service/mois.service";
import {AnneeMois} from "../../model/anneeMois";

@Component({
  selector: 'app-list-versement',
  templateUrl: './list-versement.component.html',
  styleUrls: ['./list-versement.component.css']
})
export class ListVersementComponent implements OnInit {

  showMois: boolean = false;
  showClient: boolean = false;
  showDateDebut: boolean = false;
  showDateFin: boolean = false;
  mois: AnneeMois = new AnneeMois();

  constructor(public versementService: VersementService, public moisService: MoisService, public matDialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.versementService.choixmenu === "A") {
      this.versementService.initVersement();
      this.versementService.initForm(this.versementService.versement);
    }
    this.getAllVersement();
    this.getClients();
    this.getAllActiveMois();
  }

  private getClients(): void {
    this.versementService.getClientByEtat(true).subscribe(data => {
      this.versementService.listClients = data;
    }, error => {
      console.log(error);
    });
  }

  public getAllActiveMois() {
    this.moisService.getByEtat(true).subscribe(data => {
      this.versementService.listMois = data;
    })
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
    if (value.mode == 1) {

      console.log(value);

      this.moisService.getById(value.mois).subscribe(data => {
        this.mois = data;
      }, error => {
        console.log(error);
      });


      //let val: string = this.mois.dateDebut;
      //val = val.substr(0, 10);

      let dateDebut = this.versementService.transformDate(this.mois.dateDebut);
      let dateFin = this.versementService.transformDate(this.mois.dateFin);

      console.log(dateDebut);
      console.log(dateFin);


      this.versementService.listVersement$ = this.versementService.findByIntervalDate(dateDebut, dateFin).pipe(
        map(datas => {
          return ({dataState: DataStateEnum.LOADED, data: datas});
        }),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})));
    } else if (value.mode == 2) {

      value.dateDebut = this.versementService.transformDate(value.dateDebut);
      value.dateFin = this.versementService.transformDate(value.dateFin);

      this.versementService.listVersement$ = this.versementService.findByIdClientIntervalDate(value.client, value.dateDebut, value.dateFin).pipe(
        map(datas => {
          return ({dataState: DataStateEnum.LOADED, data: datas});
        }),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})));
    }
  }

  update($event: any) {
    this.showDateFin = false;
    this.showDateDebut = false;
    this.showClient = false;
    this.showMois = false;
    let value = $event.target.value;

    if (value == 1) {
      this.showMois = true;
    } else if (value == 2) {
      this.showClient = true;
      this.showDateDebut = true;
      this.showDateFin = true;
    }
  }


}
