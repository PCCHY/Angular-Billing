import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bills';

  constructor(public authService: AuthService){}

  onDelete(){
    console.log("Deleted");   
  }

  logout(){
    this.authService.logout();
  }
}
