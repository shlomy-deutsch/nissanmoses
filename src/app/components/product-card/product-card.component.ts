import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import ProductModel1 from '../../models/product1.model';
import { loveproductAddedAction, loveproductDeletedAction, productAddedAction, productDeletedAction, setProducts, setTotal } from '../../redux/redux.component';
import store from '../../redux/store';
var arr= []

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  constructor(private http: HttpClient) {
  }
  public chatService: ChatService = new ChatService();
  public id: number | any;
  public count: number = 0;
  public cart:[]|any

  @Input()
  public product: ProductModel1 | any;
  @Input()
  public isadmin: boolean = false;
  @Input()
  public isclient: boolean = false;
  public imageUrl = 'https://mispara.herokuapp.com/api/products/images/';

  ngOnInit(): void {
    this.chatService.connect();
    this.chatService.socket.on('msg-from-server', (msg: any) => {});
  }
  enlargeImage(event: MouseEvent) {
    const container = event.currentTarget as HTMLElement;
    const image = container.querySelector('img');
    
    if (image) {
      image.classList.toggle('enlarged');
    }
  }
  

  public async deleteProduct(id: number) {
    const deleteproduct = await this.http
      .delete<ProductModel1>('https://mispara.herokuapp.com/api/products/' + id)
      .toPromise();
    this.chatService.send({ message: 'Hello World!' });
  }
  arr =[]
  addme(product:any) {
    product.count = 1
    product.totalprice = product.count*product.price
    store.dispatch(productAddedAction(product));
    const stor= store.getState().productsState.products;
    let some =0;
    for (let i = 0; i < stor.length; i++) {
      some += stor[i].totalprice;
  }
  store.dispatch(setTotal(some));
  this.chatService.send({ message: 'Hello World!' });
}

  plus(){this.count +=1}
  minus(){this.count -=1}
  isClicked = false;

  handleClick(product:ProductModel1) {
    if(this.isClicked  == false){
      this.isClicked = true;
    product.count = 1
    product.totalprice = product.count*product.price
    store.dispatch(loveproductAddedAction(product));
    // const stor= store.getState().productsState.products;
    // let some =0;
  //   for (let i = 0; i < stor.length; i++) {
  //     some += stor[i].totalprice;
  // }
  // store.dispatch(setTotal(some));
  // this.chatService.send({ message: 'Hello World!' });
  }
  else{
    this.isClicked = false;
    store.dispatch(loveproductDeletedAction(product.id));

  }
    }
  

  isBagClicked = false

  handleClick1(product:ProductModel1) {
    if (this.isBagClicked == false){
    this.isBagClicked = true;
    product.count = 1
    product.totalprice = product.count*product.price
    store.dispatch(productAddedAction(product));
    const stor= store.getState().productsState.products;
    let some =0;
    for (let i = 0; i < stor.length; i++) {
      some += stor[i].totalprice;
  }
  store.dispatch(setTotal(some));
  // this.chatService.send({ message: 'Hello World!' });
  }
  else{
    this.isBagClicked = false;
    store.dispatch(productDeletedAction(product.id));

  }
}
}

