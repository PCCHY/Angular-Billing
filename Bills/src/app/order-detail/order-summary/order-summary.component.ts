import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  quantitySum(){
    return this.orderService.quantitySum();
  }
  
  priceSum(){
    return this.orderService.priceSum();
  }

}
