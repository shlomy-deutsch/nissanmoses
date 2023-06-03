import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
class ProductModel {
  public name: string = '';
  public price: number = 0;
  public image?: FileList | any;

  public static convertToFormData(product: ProductModel): FormData {
    const myFormData = new FormData();
    myFormData.append('name', product.name);
    myFormData.append('price', product.price.toString());
    myFormData.append('image', product.image?.item(0) as Blob);

    return myFormData;
  }
}

export default ProductModel;
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent{
  public product = new ProductModel();

  constructor(private http: HttpClient) { }
  public saveImage(args: Event): void {
      this.product.image = (args.target as HTMLInputElement).files;
    }
    // const inputElement = args.target as HTMLInputElement;
    // const files = inputElement.files;
  
    // console.log("files:", files); // log the files object
  
    // if (files && files.length > 0) {
    //   const file = files[0];
    //   console.log("file:", file); // log the selected file
    //   console.log("file type:", file.type); // log the type of the selected file
    //   console.log("file size:", file.size); // log the size of the selected file
  
    //   this.product.image = new Blob([file], { type: file.type });
    //   console.log("blob:", this.product.image); // log the blob object
    // } else {
    //   this.product.image = null;
    // }
  
  public async add() {
    try {
      const add = this.addProduct(this.product);
    } catch (err) {
      console.log(err);
    }
  }
  public async addProduct(product: ProductModel) {
    const myFormData = ProductModel.convertToFormData(product);
    // fetch('http://localhost:3000/api/products', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(this.product)
    // })
  //  console.log(myFormData.get('image'));
   
    const updatedProduct = await this.http.post<ProductModel>("http://localhost:3000/api/products", myFormData).toPromise();
    return updatedProduct;
  }

}
