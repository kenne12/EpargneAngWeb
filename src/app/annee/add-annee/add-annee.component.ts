import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AnneeService} from "../../service/annee.service";

@Component({
  selector: 'app-add-annee',
  templateUrl: './add-annee.component.html',
  styleUrls: ['./add-annee.component.css']
})
export class AddAnneeComponent implements OnInit {

  constructor(public anneeService: AnneeService, private route: Router,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddAnneeComponent>) {
  }

  ngOnInit(): void {

  }


  onSubmit(): void {
    if (this.anneeService.choixmenu === "Create") {
      this.save();
    } else if (this.anneeService.choixmenu == "Edit") {
      this.edit();
    }
  }

  private save(): void {
    console.log(this.anneeService.anneeFormGroup?.value);
    this.anneeService.create(this.anneeService.anneeFormGroup?.value).subscribe(data => {
      this.dialogRef.close();
      this.route.navigateByUrl("/annees");
    }, err => {
      console.log(err);
    });
  }

  private edit(): void {
    console.log(this.anneeService.anneeFormGroup?.value);
    this.anneeService.update(this.anneeService.annee.idannee, this.anneeService.anneeFormGroup?.value).subscribe(data => {
      this.dialogRef.close();
      this.route.navigateByUrl("/annees");
    }, error => {
      console.log(error);
    });
  }
}
