import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AppDataState, DataStateEnum} from "../state/app.state";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Annee} from "../model/annee";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AnneeService {

  public baseUrl = 'http://localhost:8085/api/annee';
  public choixmenu: string = "A";
  public listAnnee$: Observable<AppDataState<Annee[]>> | null = null;
  public anneeFormGroup: FormGroup | null = null;
  public annee: Annee = new Annee();
  readonly DataStateEnum = DataStateEnum;

  constructor(private http: HttpClient, public fb: FormBuilder, private datePipe: DatePipe) {
    if (this.choixmenu === "A") {
      this.initAnnee();
      this.initForm(this.annee);
    }
  }

  public initForm(a: Annee): void {
    this.anneeFormGroup = this.fb.group({
      idannee: this.annee.idannee,
      nom: [a.nom, [Validators.required]],
      etat: [a.etat, [Validators.required]],
      dateDebut: [this.transformDate(a.dateDebut), [Validators.required]],
      dateFin: [this.transformDate(a.dateFin), [Validators.required]]
    });
  }

  public initAnnee(): void {
    this.annee = new Annee();
    this.annee.idannee = 0;
    this.annee.nom = " ";
    this.annee.etat = true;
    this.annee.dateDebut = this.transformDate(new Date());
    this.annee.dateFin = this.transformDate(new Date());
  }


  getById(id: number): Observable<Annee> {
    return this.http.get<Annee>(this.baseUrl + '/' + id);
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

  getAll(): Observable<Annee[]> {
    return this.http.get<Annee[]>(this.baseUrl + '/all');
  }

  getByEtat(etat: boolean): Observable<Annee[]> {
    return this.http.get<Annee[]>(this.baseUrl + '/all/search/etat?etat=' + etat);
  }

  public transformDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}
