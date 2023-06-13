import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import ProductModel1 from '../../models/product1.model';
import store from 'app/redux/store';
import { Unsubscribe } from 'redux';
import { setAllProducts, setCategories } from 'app/redux/redux.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  private unsubscribeMe: Unsubscribe | any;
  public nolove: Boolean = false;
  public displaylove: Boolean = false;
  public products: ProductModel1[] |any;
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
this.selectedproducts = store.getState().productsState.products;
this.numberofselectedproducts = this.selectedproducts.length

this.chatService.connect();
this.chatService.socket.on('msg-from-server', (msg: any) => {
  this.onMessageReceived();
});

  }
  
  public async getAllProducts() {
    const response = await this.http.get<ProductModel1[]>("https://mispara.herokuapp.com/api/products").toPromise();
   this.products = response;
    store.dispatch(setAllProducts(this.products))

}
private onMessageReceived() {
    this.getAllProducts();
    this.badge = store.getState().productsState.products.length;
}
showFiller = false;
openLink(url: string): void {
  // window.open(url, '_blank');
}

filterme(params: string){
 const allproducts =  store.getState().productsState.allProducts;
 if (params === 'תכשירים לשיער') {
  const filteredProducts = allproducts.filter(product => product.category === 'שמפו' || product.category === 'גל לשיער' || product.category === 'ווקס' || product.category === 'מברשות');
  this.products = filteredProducts;
} else if (params === 'מכשירי חשמל לשיער') {
  const filteredProducts = allproducts.filter(product => product.category === 'מכונות גילוח' || product.category === 'מכונות תספורת' || product.category === 'פן לשיער' || product.category === 'מחליקי שיער');
  this.products = filteredProducts;
} else {
  const filteredProducts = allproducts.filter(product => product.category === params);
  this.products = filteredProducts;
}
}
removefilter(){
  this.products = store.getState().productsState.allProducts;
}

displayloved(){
  if (this.displaylove == false){
    const loveprod = store.getState().productsState.loveproducts;
    if (loveprod.length ==0){return}
  this.products = loveprod
  
  this.displaylove = true}
else{
  this.products = store.getState().productsState.allProducts
  this.displaylove = false
  this.nolove= false
}
}
}
