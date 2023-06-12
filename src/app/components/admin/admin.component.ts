import { HttpClient } from '@angular/common/http';
import { Component, EnvironmentInjector, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from '../../../services/chat.service';
import ProductModel from '../../models/product.model';
import ProductModel1 from '../../models/product1.model';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import store from 'app/redux/store';
import { setAllProducts } from 'app/redux/redux.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public addcat:Boolean = false;
  public addbran:Boolean = false;
  public categories:string[] = [];
  public brands:string[] = [];
  isedit: boolean = false;
  displayedColumns: string[] = ['name', 'barber', 'date', 'time', 'delete'];
  dataSource: { name: any; barber: any; date: any; time: any; id: any }[] = [];
  public chatService: ChatService = new ChatService();
  products: ProductModel[] | any;
  public product = new ProductModel1();
  public editproduct = new ProductModel1();
  public nameControl: FormControl;
  public priceControl: FormControl;
  public imageControl: FormControl;
  public brandControl: FormControl;
  public categoryControl: FormControl;

  myFormGroup: FormGroup | any;

  constructor(
    private injector: EnvironmentInjector,
    private http: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private spinnerService: NgxSpinnerService
  ) {
    {
      this.nameControl = new FormControl('', Validators.required);
      this.priceControl = new FormControl('', Validators.required);
      this.imageControl = new FormControl('', Validators.required);
      this.categoryControl = new FormControl('', Validators.required);
      this.brandControl = new FormControl('', Validators.required);

      // this.myFormGroup = new FormGroup({
      //   nameControl: this.nameControl,
      //   priceControl: this.nameControl,
      //   imageControl: this.nameControl,
      //   categoryControl: this.nameControl,
      //   brandControl: this.nameControl,
      // });
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.injector.runInContext(() => {
      inject(ChatService)
  });
    this.chatService.connect();
    this.chatService.socket.on('msg-from-server', (msg: any) => {
      this.onMessageReceived();
    });
    this.getProducts();
    this.getAllProducts();
    // this.openSnackBar("good", "close");
  }
  public async getAllProducts() {
    this.spinnerService.show();
    this.products = await this.http
      .get<ProductModel1[]>('https://mispara.herokuapp.com/api/products')
      .toPromise();
      store.dispatch(setAllProducts(this.products))      
      this.products.forEach((product:any) => {
        if (!this.categories.includes(product.category)) {
          this.categories.push(product.category);
        }});        
        this.products.forEach((product:any) => {
          if (!this.brands.includes(product.brand)) {
            this.brands.push(product.brand);
          }});
          
    this.spinnerService.hide();
  }

  private onMessageReceived() {
    this.getAllProducts();
  }

  private async getProducts() {
    this.products = await this.http
      .get<ProductModel[]>('https://mispara.herokuapp.com/api/appointment')
      .toPromise();
    const newDataSource = [];
    for (let i = 0; i < this.products.length; i++) {
      const { name, barber, date, time, id } = this.products[i];
      const product = { name, barber, date, time, id };
      newDataSource.push(product);
    }

    this.dataSource = newDataSource;
  }

  async delete(id: number) {
    await this.http
      .delete<ProductModel>(
        'https://mispara.herokuapp.com/api/appointment/' + id
      )
      .toPromise();
    this.chatService.send({ message: 'Hello World!' });
  }

  public saveImage(args: Event): void {
    this.product.image = (args.target as HTMLInputElement).files;
    this.editproduct.image = (args.target as HTMLInputElement).files;
  }

  public async add() {
    if (this.isedit === true) {
      const myFormData = ProductModel1.convertToFormData(this.editproduct);
      try {
        this.http
          .put<ProductModel1>(
            'https://mispara.herokuapp.com/api/products/' + this.editproduct.id,
            myFormData
          ).toPromise();
          this.spinnerService.show();

          setTimeout(() => {
            this.spinnerService.hide();
            this.chatService.send({ message: 'Hello World!' });

          }, 1000);
      }
       catch (error) {
        console.log(error);
        // Handle the error here if needed
      }
      this.isedit = false;
      this.nameControl.setValue('');
      this.priceControl.setValue('');
      this.categoryControl.setValue('');
     this.categoryControl.setValue('');
     this.addcat = false;
     this.addbran = false
    }
  }

  public async edit(product: any) {
    this.editproduct = product;
    this.isedit = true;
    this.categoryControl.setValue(product.category);
    this.brandControl.setValue(product.brand);

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog1, {});

    dialogRef.afterClosed().subscribe((result) => {});
  }

  addcategory(){this.addcat = true}
  addbrand(){this.addbran = true}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './add-product.html',
})
export class DialogOverviewExampleDialog1 {
  public categories:string[] = [];
  public brands:string[] = [];
  public product = new ProductModel1();
  public chatService: ChatService = new ChatService();

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog1>,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.chatService.connect();
    this.chatService.socket.on('msg-from-server', (msg: any) => {});
    const products = store.getState().productsState.allProducts;

products.forEach(product => {
  if (!this.categories.includes(product.category)) {
    this.categories.push(product.category);
  }});
  // products.forEach(product => {
  //   if (!this.brands.includes(product.brand)) {
  //     this.brands.push(product.brand);
  //   }});    
  }

  public saveImage(args: Event): void {
    this.product.image = (args.target as HTMLInputElement).files;
  }

  public async add() {
    const myFormData = ProductModel1.convertToFormData(this.product);
    const addProduct = await this.http
      .post<ProductModel1>(
        'https://mispara.herokuapp.com/api/products',
        myFormData
      )
      .toPromise();

    this.chatService.send({ message: 'Hello World!' });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
