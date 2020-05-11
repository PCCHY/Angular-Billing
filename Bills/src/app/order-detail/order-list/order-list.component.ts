import { Component, OnInit, NgZone } from '@angular/core';
import { OrderService } from '../../shared/order.service';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../../shared/order.model';
import "firebase/firestore";
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore} from 'firebase';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders:Order[];

  constructor(
    private orderService: OrderService,
    private angularFirestore: AngularFirestore,
    private toastr: ToastrService,
    private ngZone: NgZone
    ) { }


  ngOnInit(): void {

    this.orderService.getOrders().subscribe(data =>{
      this.ngZone.run(() => {
        this.orders = data as Order[];
      });
    });

  }

  onDelete(id: number){
    if(window.confirm('Are sure you want to delete this order ?')){
      let name = this.orders[id].name;
      this.orderService.deleteOrder(id);
      this.toastr.success(name + ' successfully deleted!');
    }
  }

  uploadOrder(){
    this.orders.forEach(order => {
      var date=new Date();
      var data=date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
      var p=this.angularFirestore.collection('users').doc(order.customer).collection('date').doc(data).collection('items').doc(order.name).get();
      var x=this.angularFirestore.collection('users').doc(order.customer).collection('date').doc(data).collection('items').doc(order.name);
      
      p.subscribe(snap =>{
        if (snap.exists) {
        x.update({quantity: firestore.FieldValue.increment(order.quantity)});
        console.log('Successfully Updated')
        } else {
        this.angularFirestore.collection('users').doc(order.customer).collection('date').doc(data).collection('items').doc(order.name).set(order);
        console.log('Successfully Created')
        }
      });
    });

    this.orderService.orders=[];
    this.orderService.getOrders().subscribe(data=>{
        this.orders = data as Order[];
    });

    this.toastr.success("Order Submitted.")
  }

}


