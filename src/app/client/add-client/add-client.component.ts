import {Component, Inject, OnInit} from '@angular/core';
import {ClientService} from "../../service/client.service";
import {Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  constructor(public clientService: ClientService, private route: Router,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddClientComponent>) {
  }

  ngOnInit(): void {

  }


  onSubmit(): void {
    if (this.clientService.choixmenu === "Create") {
      this.save();
    } else if (this.clientService.choixmenu == "Edit") {
      this.edit();
    }
  }

  private save(): void {
    this.clientService.createClient(this.clientService.clientFormGroup?.value).subscribe(data => {
      this.dialogRef.close();
      this.route.navigateByUrl("/clients");
    }, err => {
      console.log(err);
    });
  }

  private edit(): void {
    this.clientService.updateClient(this.clientService.client.idclient, this.clientService.clientFormGroup?.value).subscribe(data => {
      this.dialogRef.close();
      this.route.navigateByUrl("/clients");
    }, error => {
      console.log(error);
    });
  }
}
