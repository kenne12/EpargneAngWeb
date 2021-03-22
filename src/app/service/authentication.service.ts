import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public jwtToken: any | null = null;
  public jwt: any;
  public roles: Array<any> = [];


  public currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());
  }

  login(user: any) {
    return this.http.post(environment.BASE_API_URL + 'login', user, {observe: 'response'});
  }

  register(user: any) {
    return this.http.post(environment.BASE_API_URL + 'api/utilisateur/register', user, {observe: 'response'});
  }

  saveToken(jwtToken: any) {
    this.jwtToken = jwtToken;
    localStorage.setItem('token', jwtToken);
    this.jwt = jwt_decode(this.jwtToken);
    this.roles = this.jwt.roles;
    this.currentUserSubject.next(this.jwt.sub);
  }

  getCurrentUser() {
    this.jwtToken = localStorage.getItem('token');
    if (this.jwtToken != null) {
      this.jwt = jwt_decode(this.jwtToken);
      return this.jwt.sub;
    } else {
      return null;
    }
  }

  loadToken(): any {
    this.jwtToken = localStorage.getItem('token');
    return this.jwtToken;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  public isAdmin(): boolean {
    let value = false;
    for (const r of this.roles) {
      if (r.authority === 'ADMIN') {
        value = true;
        break;
      }
    }
    return value;
  }
}
