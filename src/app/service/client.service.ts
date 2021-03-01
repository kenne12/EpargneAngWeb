import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Client} from '../model/client';
import {Profession} from "../model/profession";
import {AppDataState, DataStateEnum} from "../state/app.state";


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public baseUrl = 'http://localhost:8085/api/client';
  public baseUrl2 = 'http://localhost:8085/clients';
  public choixmenu: string = "A";
  public listClients$: Observable<AppDataState<Client[]>> | null = null;
  public listProfession?: Profession[];
  public clientFormGroup: FormGroup | null = null;
  public client: Client = new Client();
  readonly DataStateEnum = DataStateEnum;

  constructor(private http: HttpClient, public fb: FormBuilder) {
    if (this.choixmenu === "A") {
      this.initClient();
      this.initForm();
    }
  }

  public initForm(): void {
    this.clientFormGroup = this.fb.group({
      idclient: this.client.idclient,
      nom: [this.client.nom, [Validators.required]],
      prenom: [this.client.prenom, [Validators.required]],
      cni: [this.client.cni, [Validators.required]],
      contact: [this.client.contact, [Validators.required]],
      solde: [0, [Validators.required]],
      profession: [this.client.profession, [Validators.required]],
      etat: [this.client.etat, [Validators.required]],
      fraisCarnet: [this.client.fraisCarnet, [Validators.required]],
      numeroCarnet: [this.client.numeroCarnet, [Validators.required]]
    });
  }

  public initClient(): void {
    this.client.idclient = 0;
    this.client.prenom = "-";
    this.client.nom = "-";
    this.client.cni = "000000";
    this.client.etat = true;
    this.client.contact = "+237 ..";
    this.client.profession = "--";
    this.client.numeroCarnet = 0;
    this.client.fraisCarnet = 0;
  }


  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(this.baseUrl + '/' + id);
  }

  createClient(info: object): Observable<object> {
    return this.http.post(this.baseUrl + '/add', info);
  }

  updateClient(id: number, value: object): Observable<object> {
    return this.http.put(this.baseUrl + '/edit/' + id, value);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl + '/all');
  }

  getClientByEtat(etat: boolean): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl + '/all/search/etat?etat=' + etat);
  }

  getClientBySoldeZero(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl + '/all/search/soldeZero');
  }

  getClientBySoldeGthZero(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl + '/all/search/soldeGthZero');
  }

  getAllProfession(): Observable<any> {
    return this.http.get("http://localhost:8085/api/profession/all");
  }

  findByNomOrPrenom(keyword: string): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl + '/all/search/nomOrPrenom?keyword=' + keyword);
  }

  changeEtatClient(value: Client): Observable<Client> {
    value.etat = !value.etat;
    return this.http.put<Client>(this.baseUrl + '/changeState/' + value.idclient, value)
  }
}
