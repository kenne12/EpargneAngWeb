import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public jwt: any;

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    //document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    localStorage.removeItem("token");
    const token = this.authService.loadToken();
    if (token) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  onLogin(formData: any) {
    this.authService.login(formData).subscribe(resp => {
      let jwtToken = resp.headers.get('Authorization')?.toString();
      jwtToken = jwtToken?.replace('Bearer ', '');
      console.log(jwtToken);
      this.authService.saveToken(jwtToken);
      this.router.navigateByUrl('/dashboard');
    }, error => {
      console.log(error);
    });
  }

  onRegister() {
    this.router.navigateByUrl('/register');
  }

}
