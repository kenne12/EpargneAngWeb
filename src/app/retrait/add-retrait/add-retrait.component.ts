import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClientService} from "../../service/client.service";
import {Router} from "@angular/router";
import {RetraitService} from "../../service/retrait.service";

@Component({
  selector: 'app-add-retrait',
  templateUrl: './add-retrait.component.html',
  styleUrls: ['./add-retrait.component.css']
})
export class AddRetraitComponent implements OnInit {

  constructor(public retraitService: RetraitService, public clientService: ClientService, public router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddRetraitComponent>) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.retraitService.choixmenu == "Create") {
      this.save();
    } else if (this.retraitService.choixmenu == "Edit") {
      this.edit();
    }
  }


  private save(): void {
    this.retraitService.retraitFormGroup?.controls['client'].setValue(this.retraitService.client);
    this.retraitService.createRetrait(this.retraitService.retraitFormGroup?.value).subscribe(data => {
      this.dialogRef.close();
      this.router.navigateByUrl("/retraits");
    }, error => {
      console.log(error)
    });
  }


  private edit(): void {
    this.retraitService.retraitFormGroup?.controls['client'].setValue(this.retraitService.client);
    //let idVersement: number = this.retraitService.retraitFormGroup?.controls['idRetrait'].value;
    this.retraitService.updateRetrait(this.retraitService.retrait.idRetrait, this.retraitService.retraitFormGroup?.value).subscribe(data => {
      this.dialogRef.close();
      this.router.navigateByUrl("/versements");
    }, error => {
      console.log(error);
    });
  }

  updateSolde($event: any) {
    this.clientService.getClientById($event.target.value).subscribe(data => {
      this.retraitService.client = data;
      this.retraitService.retraitFormGroup?.controls['solde'].setValue(data.solde);
    });
  }

  updateSolde2($event: any, option: string) {
    if (this.clientService.client.idclient != null) {


      let montant = parseFloat($event.target.value);
      if (montant == null) {
        montant = 0;
      }

      let solde: number = this.retraitService.client.solde;
      console.log("solde avant : " + this.retraitService.client.solde);

      if (option === "1") {
        let commission: number = this.retraitService.retraitFormGroup?.controls['commission'].value;
        solde -= montant;
        if (commission != null && commission > 0) {
          solde -= commission;
        }
        this.retraitService.retraitFormGroup?.controls['solde'].setValue(solde);
      }

      if (option === "2") {
        let valeur: number = this.retraitService.retraitFormGroup?.controls['montant'].value;
        solde -= montant;
        if (valeur != null) {
          solde -= valeur;
        }
        this.retraitService.retraitFormGroup?.controls['solde'].setValue(solde);
      }
    }
  }
}
