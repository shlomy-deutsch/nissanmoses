import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import ProductModel from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { ChatService } from '../../../services/chat.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

import AuthModel from '../../models/auth.model';
import store from 'app/redux/store';
import { setAuth } from 'app/redux/redux.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'barber', 'date', 'time'];
  dataSource: { name: any; barber: any; date: any; time: any; }[] = [];
  public isTable: boolean = false
  public chatService: ChatService = new ChatService();
  products: ProductModel[] |any;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.chatService.connect();
    this.chatService.socket.on('msg-from-server', (msg: any) => {
      this.onMessageReceived();
    });
    this.getProducts();
  }

  private onMessageReceived() {
    this.getProducts();
  }

  private async getProducts() {
    try {
      const response = await this.http.get<ProductModel[]>('https://mispara.herokuapp.com/api/appointment').toPromise();
      this.products = response;
      const newDataSource = [];
      for (let i = 0; i < this.products.length; i++) {
        const { name, barber, date, time } = this.products[i];
        const product = { name, barber, date, time };
        newDataSource.push(product);
      }
      this.dataSource = newDataSource;
      if(newDataSource.length>0){
      this.isTable = true}
    } catch (error) {
      console.error('Error retrieving products', error);
    }
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogOverviewExampleDialog {
  product = new AuthModel();
  auth: AuthModel | any;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private http: HttpClient,
    private myRouter: Router
  ) {}

  public async send() {
    try {
      this.auth = await this.http
        .post<AuthModel[]>('https://mispara.herokuapp.com/api/auth', this.product)
        .toPromise();
      if (this.auth.admin === 1 || this.auth.admin === true) {
        store.dispatch(setAuth(true));

        this.myRouter.navigateByUrl('/admin');
      }
    } catch (err: any) {
      alert('שגיאה בקוד או בשם משתמש');
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
