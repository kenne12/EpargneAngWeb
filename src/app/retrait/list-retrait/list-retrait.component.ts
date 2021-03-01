import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {catchError, map, startWith} from "rxjs/operators";
import {DataStateEnum} from "../../state/app.state";
import {of} from "rxjs";
import {Retrait} from "../../model/retrait";
import {RetraitService} from "../../service/retrait.service";
import {AddRetraitComponent} from "../add-retrait/add-retrait.component";

@Component({
  selector: 'app-list-retrait',
  templateUrl: './list-retrait.component.html',
  styleUrls: ['./list-retrait.component.css']
})
export class ListRetraitComponent implements OnInit {

  constructor(public retraitService: RetraitService, public matDialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.retraitService.choixmenu === "A") {
      this.retraitService.initRetrait();
      this.retraitService.initForm(this.retraitService.retrait);
    }
    this.getAll();

    this.retraitService.getClientByEtat(true).subscribe(data => {
      this.retraitService.listClients = data;
    }, error => {
      console.log(error);
    });
  }

  public getAll() {
    this.retraitService.listRetraits$ = this.retraitService.getAll().pipe(
      map(datas => {
        return ({dataState: DataStateEnum.LOADED, data: datas});
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})));
  }

  onPrepareNew(): void {
    this.retraitService.choixmenu = "Create";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.retraitService.initRetrait();
    this.retraitService.initForm(this.retraitService.retrait);
    this.matDialog.open(AddRetraitComponent, dialogConfig);
  }

  onPrepareEdit(r: Retrait): void {
    this.retraitService.choixmenu = "Edit";
    this.retraitService.retrait = r;
    this.retraitService.client = r.client;

    /*this.retraitService.retraitFormGroup = this.retraitService.fb.group(Object.assign({}, r));*/

    this.retraitService.initForm(r);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.matDialog.open(AddRetraitComponent, dialogConfig);
  }

  onDelete(r: Retrait): void {
    let action = confirm("Voulez vous vraiment supprimer le retrait ?");
    if (action) {
      this.retraitService.deleteRetrait(r.idRetrait).subscribe(datas => {
        this.retraitService.retrait = new Retrait();
        console.log("Supprimé avec succès");
      });
    }
  }

  onSearch(value: any) {

  }


}
