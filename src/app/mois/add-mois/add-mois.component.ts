import {Component, Inject, OnInit} from '@angular/core';
import {MoisService} from "../../service/mois.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AnneeService} from "../../service/annee.service";

@Component({
  selector: 'app-add-mois',
  templateUrl: './add-mois.component.html',
  styleUrls: ['./add-mois.component.css']
})
export class AddMoisComponent implements OnInit {

  constructor(public moisService: MoisService, private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddMoisComponent>,
              public anneeService: AnneeService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.moisService.choixmenu == 'Create') {
      this.save();
    } else {
      this.edit();
    }
  }

  private save() {
    this.moisService.moisFormGroup?.controls['annee'].setValue(this.moisService.annee);
    this.moisService.moisFormGroup?.controls['mois'].setValue(this.moisService.mois_);

    console.log(this.moisService.moisFormGroup?.value);

    this.moisService.create(this.moisService.moisFormGroup?.value).subscribe(data => {
      this.dialogRef.close();
      this.router.navigateByUrl("/mois");
    }, error => {
      console.log(error);
    });
  }

  private edit(): void {
    this.moisService.update(this.moisService.mois.id, this.moisService.moisFormGroup?.value).subscribe(data => {
      this.dialogRef.close();
      this.router.navigateByUrl("/mois");
      console.log("success")
    }, error => {
      console.log(error);
    });
  }

  updateMois($event: any) {
    this.moisService.getRestMoisByIdAnnee($event.target.value).subscribe(data => {
      this.moisService.listMois_ = data;
    });

    this.anneeService.getById($event.target.value).subscribe(data => {
      this.moisService.annee = data;
    }, error => {
      console.log(error);
    });
  }

  loadMois($event: any) {
    this.moisService.getMoisById($event.target.value).subscribe(data => {
      this.moisService.mois_ = data;
    }, error => {
      console.log(error);
    });
  }
}
