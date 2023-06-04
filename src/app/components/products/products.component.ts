import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import ProductModel1 from '../../models/product1.model';
import store from 'app/redux/store';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  private unsubscribeMe: Unsubscribe | any;
  public products?: ProductModel1[];
  public chatService: ChatService = new ChatService();
  public selectedproducts?: ProductModel1[];
  public numberofselectedproducts: number =0
  public istable: boolean = true;
  public badge: number =0
  public lovebadge: number =0

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.badge = store.getState().productsState.products.length;
    this.lovebadge = store.getState().productsState.loveproducts.length;

    this.unsubscribeMe = store.subscribe(() => {
     this.badge = store.getState().productsState.products.length;
     this.lovebadge = store.getState().productsState.loveproducts.length;

    });
this.getAllProducts()
this.selectedproducts= store.getState().productsState.products;
this.numberofselectedproducts =this.selectedproducts.length

this.chatService.connect();
this.chatService.socket.on('msg-from-server', (msg: any) => {
  this.onMessageReceived();
});

  }
  
  enlargeImage(event: MouseEvent, index: number) {
    const card = event.currentTarget as HTMLElement;
    const image = card.querySelector('img');
  
    if (image) {
      image.classList.toggle('enlarged');
    }
    event.stopPropagation(); // Optional, prevents event bubbling
  }
  
  
  public async getAllProducts() {
    const response = await this.http.get<ProductModel1[]>("https://mispara.herokuapp.com/api/products").toPromise();
   this.products = response
    
}
private onMessageReceived() {
    this.getAllProducts();
    this.badge = store.getState().productsState.products.length;
}
showFiller = false;
}
