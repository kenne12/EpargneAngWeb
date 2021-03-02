import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AppDataState, DataStateEnum} from "../state/app.state";
import {Utilisateur} from "../model/utilisateur";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  public baseUrl = 'http://localhost:8085/api/utilisateur';
  public choixmenu: string = "A";
  public listUtilisateur$: Observable<AppDataState<Utilisateur[]>> | null = null;
  public utilisateurFormGroup: FormGroup | null = null;
  public utilisateur: Utilisateur = new Utilisateur();
  readonly DataStateEnum = DataStateEnum;

  constructor(private http: HttpClient, public fb: FormBuilder) {
    if (this.choixmenu === "A") {
      this.initUtilisateur();
      this.initForm(this.utilisateur);
    }
  }

  public initForm(u: Utilisateur): void {
    this.utilisateurFormGroup = this.fb.group({
      idUtilisateur: this.utilisateur.idUtilisateur,
      nom: [u.nom, [Validators.required]],
      prenom: [u.prenom, [Validators.required]],
      login: [u.login, [Validators.required]],
      password: [u.password, [Validators.required]],
      actif: [u.actif, [Validators.required]],
      photo: [u.photo, [Validators.required]]
    });
  }

  public initUtilisateur(): void {
    this.utilisateur.idUtilisateur = 0;
    this.utilisateur.prenom = " ";
    this.utilisateur.nom = " ";
    this.utilisateur.photo = "";
    this.utilisateur.actif = true;
    this.utilisateur.login = "";
    this.utilisateur.password = "";
  }


  getById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.baseUrl + '/' + id);
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

  getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.baseUrl + '/all');
  }

  getByEtat(etat: boolean): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.baseUrl + '/all/search/etat?etat=' + etat);
  }


  findByNomOrPrenom(keyword: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.baseUrl + '/all/search/nomOrPrenom?keyword=' + keyword);
  }

  changeEtat(value: Utilisateur): Observable<Utilisateur> {
    value.actif = !value.actif;
    return this.http.put<Utilisateur>(this.baseUrl + '/changeState/' + value.idUtilisateur, value)
  }

  resetPassword(value: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(this.baseUrl + '/resetPassword/' + value.idUtilisateur, value)
  }
}
