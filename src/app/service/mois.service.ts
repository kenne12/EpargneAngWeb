import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AppDataState, DataStateEnum} from "../state/app.state";
import {Annee} from "../model/annee";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {AnneeMois} from "../model/anneeMois";
import {Mois} from "../model/mois";

@Injectable({
  providedIn: 'root'
})
export class MoisService {

  public baseUrl = 'http://localhost:8085/api/anneemois';
  public baseUrl_annee = 'http://localhost:8085/api/annee';
  public choixmenu: string = "A";
  public listMois$: Observable<AppDataState<AnneeMois[]>> | null = null;
  public moisFormGroup: FormGroup | null = null;
  public mois: AnneeMois = new AnneeMois();
  public annee: Annee = new Annee();
  public mois_: Mois = new Mois();

  public listMois_?: Mois[];
  public listAnnee?: Annee[];
  readonly DataStateEnum = DataStateEnum;

  constructor(private http: HttpClient, public fb: FormBuilder, private datePipe: DatePipe) {
    if (this.choixmenu === "A") {
      this.initMois();
      this.initForm(this.mois);
    }
  }

  public initForm(a: AnneeMois): void {
    this.moisFormGroup = this.fb.group({
      id: a.id,
      annee: [0, [Validators.required]],
      mois: [0, [Validators.required]],
      etat: [a.etat, [Validators.required]],
      dateDebut: [this.transformDate(a.dateDebut), [Validators.required]],
      dateFin: [this.transformDate(a.dateFin), [Validators.required]]
    });
  }

  public initMois(): void {
    this.mois = new AnneeMois();
    this.mois.id = 0;
    this.mois.etat = true;
    this.mois.annee = new Annee();
    this.mois.mois = new Mois();
    this.mois.dateDebut = this.transformDate(new Date());
    this.mois.dateFin = this.transformDate(new Date());
  }


  getById(id: number): Observable<AnneeMois> {
    return this.http.get<AnneeMois>(this.baseUrl + '/' + id);
  }

  create(info: object): Observable<object> {
    return this.http.post(this.baseUrl + '/add', info);
  }

  update(id: number, value: object): Observable<object> {
    return this.http.put(this.baseUrl + '/edit/' + id, value);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  getAll(): Observable<AnneeMois[]> {
    return this.http.get<AnneeMois[]>(this.baseUrl + '/all');
  }

  getByEtat(etat: boolean): Observable<AnneeMois[]> {
    return this.http.get<AnneeMois[]>(this.baseUrl + '/all/search/etat?etat=' + etat);
  }

  getAnneeByEtat(etat: boolean): Observable<Annee[]> {
    return this.http.get<Annee[]>(this.baseUrl_annee + '/all/search?etat=' + etat);
  }

  public transformDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  getRestMoisByIdAnnee(idAnnee: number): Observable<Mois[]> {
    return this.http.get<Mois[]>(this.baseUrl + '/mois/' + idAnnee);
  }
}
