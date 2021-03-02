import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UtilisateurService} from "../../service/utilisateur.service";

@Component({
  selector: 'app-add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.css']
})
export class AddUtilisateurComponent implements OnInit {

  constructor(public utilisateurService: UtilisateurService, private route: Router,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddUtilisateurComponent>) {
  }

  ngOnInit(): void {

  }


  onSubmit(): void {
    if (this.utilisateurService.choixmenu === "Create") {
      this.save();
    } else if (this.utilisateurService.choixmenu == "Edit") {
      this.edit();
    }
  }

  private save(): void {
    this.utilisateurService.create(this.utilisateurService.utilisateurFormGroup?.value).subscribe(data => {
      this.dialogRef.close();
      this.route.navigateByUrl("/utilisateurs");
    }, err => {
      console.log(err);
    });
  }

  private edit(): void {
    this.utilisateurService.update(this.utilisateurService.utilisateur.idUtilisateur, this.utilisateurService.utilisateurFormGroup?.value).subscribe(data => {
      this.dialogRef.close();
      this.route.navigateByUrl("/utilisateurs");
    }, error => {
      console.log(error);
    });
  }

}
