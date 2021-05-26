import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AppDataState, DataStateEnum} from "../state/app.state";
import {Client} from "../model/client";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Versement} from "../model/versement";
import {HttpClient} from "@angular/common/http";
import {ClientService} from "./client.service";
import {DatePipe} from "@angular/common";
import {AnneeMois} from "../model/anneeMois";

@Injectable({
  providedIn: 'root'
})
export class VersementService {

  public baseUrl = 'http://localhost:8085/api/versement';
  public choixmenu: string = "A";
  public listVersement$: Observable<AppDataState<Versement[]>> | null = null;
  public listClients?: Client[];
  public listMois?: AnneeMois[];
  public versementFormGroup?: FormGroup | null = null;
  public versement: Versement = new Versement();
  public client: Client = new Client();
  readonly DataStateEnum = DataStateEnum;

  constructor(private http: HttpClient, private clientService: ClientService, public fb: FormBuilder, private datePipe: DatePipe) {
    if (this.choixmenu === "A") {
      this.initVersement();
      this.initForm(this.versement);
    }
  }

  public initForm(v: Versement): void {
    this.versementFormGroup = this.fb.group({
      idVersement: v.idVersement,
      client: [this.client.idclient, [Validators.required]],
      montant: [v.montant, [Validators.required]],
      solde: [v.solde, [Validators.required]],
      date: [this.transformDate(v.date), [Validators.required]],
      heure: [this.transformHeure(v.heure), [Validators.required]],
    });
  }

  public initVersement(): Versement {
    this.client = new Client();
    this.client.idclient = 0;
    this.versement = new Versement();
    this.versement.idVersement = 0;
    this.versement.montant = 0;
    this.versement.date = this.transformDate(new Date());
    this.versement.heure = this.transformHeure(new Date());
    this.versement.solde = 0;
    return this.versement;
  }

  getVersementById(id: number): Observable<object> {
    return this.http.get(this.baseUrl + '/' + id);
  }

  createVersement(info: object): Observable<Versement> {
    return this.http.post<Versement>(this.baseUrl + '/add', info);
  }

  updateVersement(id: number, value: object): Observable<object> {
    return this.http.put(this.baseUrl + '/edit/' + id, value);
  }

  deleteVersement(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  getAll(): Observable<Versement[]> {
    return this.http.get<Versement[]>(this.baseUrl + '/all');
  }

  getClientByEtat(etat: boolean): Observable<Client[]> {
    return this.clientService.getClientByEtat(etat);
  }

  public transformDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  public transformHeure(date: any) {
    return this.datePipe.transform(date, "yyyy-MM-dd'T'HH:mm:ss");
  }

  findByIdClientIntervalDate(idClient: any, dateDebut: any, dateFin: any): Observable<Versement[]> {
    return this.http.get<Versement[]>(this.baseUrl + '/search/client?idClient=' + idClient + '&dateDebut=' + dateDebut + '&dateFin=' + dateFin);
  }

  findByIntervalDate(dateDebut: any, dateFin: any): Observable<Versement[]> {
    return this.http.get<Versement[]>(this.baseUrl + '/search/date?dateDebut='+dateDebut+'&dateFin='+dateFin);
  }

}
