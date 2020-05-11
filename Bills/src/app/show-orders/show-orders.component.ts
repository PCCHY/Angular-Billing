import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderService } from '../shared/order.service';
import { startWith, map } from 'rxjs/operators';

import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent implements OnInit {

  orders:any[];
  public customers: Observable<any[]>;
  filteredOptions: Observable<any[]>;
  custo: string[] = [];
  
  public orderColl:any[] = [];

  public showOrderForm: FormGroup;
  public isFormValid = false;

  maxDate:Date = new Date();
  


  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { 
  }

  ngOnInit(): void {

    this.showOrderFormInit();
    this.orderService.getCustomers().subscribe(data =>{
      data.forEach(element => {
        this.custo.push(element.id);
      });
    });

    this.filteredOptions = this.showOrderForm.controls['customer'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }


  private _filter(value: string): string[] {
    if (value){
    const filterValue = value.toLowerCase();
    return this.custo.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  showOrderFormInit(){
    this.showOrderForm = this.fb.group({
      customer: [null,[Validators.required]],
      startDate: ['',[Validators.required]],
      endDate: ['',[Validators.required]],
    });

  }

  onDateChange(){
    const date1 = new Date(this.showOrderForm.controls['startDate'].value);
    for(var d = 0;d<7;d++){
    date1.setDate(date1.getDate() + 1);
    }
    this.maxDate = date1;
    console.log(this.maxDate);
  }


  submitShow(){
    this.orderColl=[];
    console.log(this.showOrderForm.value);
    const date1 = new Date(this.showOrderForm.controls['startDate'].value);
    const date2 = new Date(this.showOrderForm.controls['endDate'].value);
    

    for(var d=date1;d<=date2;d.setDate(d.getDate()+1)){
        const dat = new DatePipe('en-US').transform(d, 'd-M-yyyy');
        this.orderService.showOrder(this.showOrderForm.controls['customer'].value,dat).subscribe(data=>{
          var sum:number=0;
          for(let i=0;i<data.length;i++){
            sum = sum + data[i].rate*data[i].quantity;
          }
          //add item for priceSum in orders in orderColl
          var priceSum =sum;
          this.orderColl.push({data: data,dat:dat,priceSum:priceSum});
          console.log(data);
        });
    }

  }

  //Reset student form's values
  ResetForm(){
    this.showOrderForm.reset();
  }


}
