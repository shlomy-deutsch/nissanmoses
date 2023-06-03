import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
;
import {
  FormBuilder,
  FormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../../../services/chat.service';
import ProductModel from '../../models/product.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  today: Date = new Date();
  products: any = [];
  selected: Date | null | undefined;
  hours: any = ['08:00', '08:30', '09:00', '09:30'];
  clicked: boolean = false;
  fulldate: string = '';
  fulltime: any = '';
  product = new ProductModel();
  isFormVisible: boolean = false;
  barbers: any = ['משה', 'רחמים'];
  isBarbers: boolean = false;
  selectedBarber: string = '';
  
  // public barberControl: FormControl;
  // public typeControl: FormControl;
  // public dateControl: FormControl;
  // public timeControl: FormControl;

  myFormGroup: UntypedFormGroup | any;

  public months: { [key: string]: string } = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };
  constructor(
    private http: HttpClient,
    private myRouter: Router,
    private chatService: ChatService
  ) {
    // {
    //   this.nameControl = new FormControl(null, Validators.required);
    //   this.phoneControl = new FormControl(null, Validators.required);
    //   this.barberControl = new FormControl(null, Validators.required);
    //   this.typeControl = new FormControl(null);
    //   this.dateControl = new FormControl(null);
    //   this.timeControl = new FormControl(null);
    //   this.myFormGroup = new FormGroup({
    //     nameControl: this.nameControl,
    //   });
    // }
  }

  ngOnInit(): void {
    this.chatService.connect();
  }
  async selectbarber(b: string) {
    this.clicked = true;
    this.selectedBarber = b;
    try {
      this.hours = ['08:00', '08:30', '09:00', '09:30' ,'10:00', '10:30','11:00','11:30','12:00','12:30','13:00','13:30', '14:30','15:00','15:30','16:00'];
      const products = await this.getdate(this.fulldate, this.selectedBarber);
      this.products = Array.isArray(products) ? products : [];
      const filteredHours = this.hours.filter(
        (hour: any) =>
          !this.products.some(
            (product: { time: any }) => product.time.slice(0, 5) === hour
          )
      );
      this.hours = filteredHours;
    } catch (error: any) {
      console.log('Error fetching products:', error.message);
    }
  }

  date(e: any) {
    const n = e + 3;
    const num = n.slice(4, 7); 
    const year = n.slice(11, 15);
    const day = n.slice(8, 10);
    if ( e>this.today || day==this.today.getDate()) {

    this.isBarbers = true;
    
    const month = this.getMonthNumber(num);
    const fulldate = year + '-' + month + '-' + day;
    this.fulldate = fulldate;
    this.clicked = false;
    if (this.selectedBarber !== '') {
      this.selectbarber(this.selectedBarber);
    }}
    else{
      null
    }
  }
  getMonthNumber(monthName: string): string | undefined {
    return this.months[monthName];
  }
  async getdate(arg: string, arg2: string): Promise<Array<any>> {
    const data = await this.http
      .get<[]>('https://mispara.herokuapp.com/appointment/' + arg + '/' + arg2)
      .toPromise();
    console.log('data:', data);
    return data || [];
  }

  public setTime(arg: any) {
    this.fulltime = arg;
    this.isFormVisible = true;
  }

  public async add() {
    try {
      this.product.date = this.fulldate;
      this.product.time = this.fulltime;
      this.product.barber = this.selectedBarber;
      const myFormData = ProductModel.convertToFormData(this.product);
      console.log(myFormData);

      const updatedProduct = await this.http
        .post<ProductModel>('https://mispara.herokuapp.com/api/appointment', this.product)
        .toPromise();
      alert('good');
      this.myRouter.navigateByUrl('/home');
      this.chatService.send({ message: 'Hello World!' });
    } catch (err) {
      console.log(err);
    }
  }
}
