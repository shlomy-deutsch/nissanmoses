import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import ProductModel1 from 'app/models/product1.model';

@Component({
  selector: 'app-nissan-moses',
  templateUrl: './nissan-moses.component.html',
  styleUrls: ['./nissan-moses.component.css']
})
export class NissanMosesComponent implements OnInit {
  public products?: ProductModel1[] = [];

  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '' });

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    await this.getAllProducts();

    if (this.products) {
      this.slides = this.products.map((product, index) => ({
        id: index,
        src: product.image,
        title: product.price,
        subtitle: product.name
      }));
    }
      
  }

  public async getAllProducts(): Promise<void> {
    const response = await this.http
      .get<ProductModel1[]>('https://mispara.herokuapp.com/api/products')
      .toPromise();
    this.products = response;
  }
}

