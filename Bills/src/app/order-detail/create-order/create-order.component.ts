import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/order.service';//crud service api
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Order } from '../../shared/order.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';





@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  public orderForm: FormGroup;

  public customers: Observable<any>;
  filteredOptions: Observable<any[]>;
  custo: string[]=[];

  setCust: string = '';

  constructor(
    private orderService: OrderService,//crud api service
    private fb: FormBuilder,//Form builder service for reactive forms
    private toastr: ToastrService//Toastr service for alert messages
  ) { }

  ngOnInit(): void {
    this.orderFormInit();

    this.orderService.getCustomers().subscribe(data => {
      data.forEach(element => {
        this.custo.push(element.id);
      });
      console.log(this.custo);
    });

    this.customers = this.orderService.getCustomers();

    this.filteredOptions = this.orderForm.controls['customer'].valueChanges.pipe(
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
  
  orderFormInit() {

    this.orderForm = this.fb.group({
      customer: [null, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      rate: ['', [Validators.required, Validators.min(0)]]
    });
  }

  getName() {
    return this.orderForm.get('name');
  }

  getQuantity(){
    return this.orderForm.get('quantity');
  }

  getRate(){
    return this.orderForm.get('rate');
  }

  getCustomer(){
    return this.orderForm.get('customer');
  }

  //Reset student form's values
  ResetForm(){
    this.orderForm.reset();
    this.orderForm.controls['customer'].patchValue(this.setCust);
  }

  changeCustomer(e) {
    this.orderForm.get("customer").patchValue(e.target.value);
  }

  submitOrder(){
    console.log(this.orderForm.value);

    this.orderService.createOrder(this.orderForm.value as Order);

    this.toastr.success(this.orderForm.controls['name'].value + ' successfully added!');

    this.setCust = this.orderForm.controls['customer'].value;
    
    this.ResetForm();
  }

}
