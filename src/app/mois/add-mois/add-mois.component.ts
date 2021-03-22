import {Component, OnInit} from '@angular/core';
import {MoisService} from "../../service/mois.service";

@Component({
  selector: 'app-add-mois',
  templateUrl: './add-mois.component.html',
  styleUrls: ['./add-mois.component.css']
})
export class AddMoisComponent implements OnInit {

  constructor(public moisService: MoisService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  updateMois($event: any) {
    this.moisService.getRestMoisByIdAnnee($event.target.value).subscribe(data => {
      this.moisService.listMois_ = data;
    });
  }

  loadMois($event: any) {

  }
}
