import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AppDataState, DataStateEnum} from "../state/app.state";
import {Versement} from "../model/versement";
import {Client} from "../model/client";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ClientService} from "./client.service";
import {DatePipe} from "@angular/common";
import {Retrait} from "../model/retrait";

@Injectable({
  providedIn: 'root'
})
export class RetraitService {

  public baseUrl = 'http://localhost:8085/api/retrait';
  public choixmenu: string = "A";
  public listRetraits$: Observable<AppDataState<Retrait[]>> | null = null;
  public listClients?: Client[];
  public retraitFormGroup?: FormGroup | null = null;
  public retrait: Retrait = new Retrait();
  public client: Client = new Client();
  readonly DataStateEnum = DataStateEnum;

  constructor(private http: HttpClient, private clientService: ClientService, public fb: FormBuilder, private datePipe: DatePipe) {
    if (this.choixmenu === "A") {
      this.initRetrait();
      this.initForm(this.retrait);
    }
  }

  /*public initForm(): void {
    this.retraitFormGroup = this.fb.group({
      idRetrait: 0,
      client: [0, [Validators.required]],
      montant: [0, [Validators.required]],
      commission: [0, Validators.required],
      commissionAuto: [false, Validators.required],
      solde: [0, [Validators.required]],
      date: [this.transformDate(new Date()), [Validators.required]],
      heure: [this.transformHeure(new Date()), [Validators.required]],
    });
  }*/

  public initForm(r: Retrait): void {
    this.retraitFormGroup = this.fb.group({
      idRetrait: r.idRetrait,
      client: [r.client.idclient, [Validators.required]],
      montant: [r.montant, [Validators.required]],
      commission: [r.commission, Validators.required],
      commissionAuto: [r.commissionAuto, Validators.required],
      solde: [r.solde, [Validators.required]],
      date: [this.transformDate(r.date), [Validators.required]],
      heure: [this.transformHeure(r.heure), [Validators.required]],
    });
  }

  public initRetrait(): Retrait {
    this.client = new Client();
    this.retrait = new Retrait();
    this.retrait.idRetrait = 0;
    this.retrait.montant = 0;
    this.retrait.date = this.transformDate(new Date());
    this.retrait.heure = this.transformHeure(new Date());
    this.retrait.commission = 0;
    this.retrait.commissionAuto = false;
    this.retrait.solde = 0;
    return this.retrait;
  }


  getRetraitById(id: number): Observable<object> {
    return this.http.get(this.baseUrl + '/' + id);
  }

  createRetrait(info: object): Observable<Retrait> {
    return this.http.post<Retrait>(this.baseUrl + '/add', info);
  }

  updateRetrait(id: number, value: object): Observable<object> {
    return this.http.put(this.baseUrl + '/edit/' + id, value);
  }

  deleteRetrait(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  getAll(): Observable<Retrait[]> {
    return this.http.get<Retrait[]>(this.baseUrl + '/all');
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
}
