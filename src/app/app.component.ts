import { AuthService } from './auth-component/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Samay Depense';
  logo:any = "../assets/images/logo.svg";
  bg1:any = "../assets/images/bgimg.jpg";
  loggedIn: any;
  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(
      status => {
        this.loggedIn = status;
        console.log('isLogged', this.loggedIn);
      }
    );
  }
}
