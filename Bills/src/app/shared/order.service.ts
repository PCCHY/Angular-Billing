import { Injectable } from '@angular/core';

import { Order } from './order.model';
//import { Customer } from './customer.model';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import 'firebase/firestore';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  orders: Order[]=[];
  // customers: Customer[]=[
  //   { id: 11, name: 'Dr Nice' },
  //   { id: 12, name: 'Narco' },
  //   { id: 13, name: 'Bombasto' },
  //   { id: 14, name: 'Celeritas' },
  //   { id: 15, name: 'Magneta' },
  //   { id: 16, name: 'RubberMan' },
  //   { id: 17, name: 'Dynama' },
  //   { id: 18, name: 'Dr IQ' },
  //   { id: 19, name: 'Magma' },
  //   { id: 20, name: 'Tornado' }
  // ];

  constructor(private angularFirestore: AngularFirestore) { }

  getOrders(): Observable<Order[]>{
    //return this.angularFirestore.collection('orders').valueChanges({idField: 'id'});
    return of(this.orders);
  }

  getCustomers(): Observable<any>{
    return this.angularFirestore.collection('users').valueChanges({idField:'id'});
  }

  showOrder(customer:string,date:string): Observable<any[]>{
    return this.angularFirestore.collection('users').doc(customer).collection('date').doc(date).collection('items').valueChanges();
    //return this.angularFirestore.collection('users').doc(customer).collection("date").doc(date).collection('items').valueChanges();
  }

  createOrder(order: Order){
    
  
    //p.update({quantity: firestore.FieldValue.increment(order.quantity)});
    //return this.angularFirestore.collection('users').doc(order.customer).collection('date').doc(data).collection('items').doc(order.name).set(order);
    this.orders.push(order);
  }


  deleteOrder(orderId: number){
    //this.angularFirestore.doc('orders/'+orderId).delete();
    this.orders.splice(orderId,1);
  }

  quantitySum(){
    var totalQuantity = 0;
    for(let i=0;i<this.orders.length;i++){
      totalQuantity = totalQuantity + this.orders[i].quantity;
    }
    return totalQuantity;
  }


  priceSum(){
    var totalPrice = 0;
    for(let i=0;i<this.orders.length;i++){
      totalPrice = totalPrice + this.orders[i].quantity*this.orders[i].rate;
    }
    return totalPrice;
  }
}
