import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isLoggedIn: boolean=this.authService.isLoggedIn;
  constructor(private authService: AuthService,public orderService: OrderService) { }
  ngOnInit(): void {
    
  }

  logout(){
    this.authService.logout();
  }
}
