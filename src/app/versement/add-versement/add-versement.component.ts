import {Component, Inject, OnInit} from '@angular/core';
import {VersementService} from "../../service/versement.service";
import {ClientService} from "../../service/client.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-versement',
  templateUrl: './add-versement.component.html',
  styleUrls: ['./add-versement.component.css']
})
export class AddVersementComponent implements OnInit {

  constructor(public versementService: VersementService, public clientService: ClientService, public router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddVersementComponent>) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.versementService.choixmenu == "Create") {
      this.save();
    } else if (this.versementService.choixmenu == "Edit") {
      this.edit();
    }
  }


  private save(): void {
    this.versementService.versementFormGroup?.controls['client'].setValue(this.versementService.client);
    this.versementService.createVersement(this.versementService.versementFormGroup?.value).subscribe(data => {
      this.dialogRef.close();
      this.router.navigateByUrl("/versements");
    }, error => {
      console.log(error)
    });
  }


  private edit(): void {
    this.versementService.versementFormGroup?.controls['client'].setValue(this.versementService.client);
    //let idVersement: number = this.versementService.versementFormGroup?.controls['idVersement'].value;
    this.versementService.updateVersement(this.versementService.versement.idVersement, this.versementService.versementFormGroup?.value).subscribe(data => {
      this.dialogRef.close();
      this.router.navigateByUrl("/versements");
    }, error => {
      console.log(error);
    });
  }

  updateSolde($event: any) {
    this.clientService.getClientById($event.target.value).subscribe(data => {
      this.versementService.client = data;
      this.versementService.versementFormGroup?.controls['solde'].setValue(data.solde);
    });
  }

  updateSolde2($event: any) {
    let solde: number = 0
    let montant = parseFloat($event.target.value);
    if (montant != null) {
      solde = montant;
    }

    if (this.clientService.client.idclient != null) {
      solde += this.versementService.client.solde;
    }

    this.versementService.versementFormGroup?.controls['solde'].setValue(solde);
  }
}
