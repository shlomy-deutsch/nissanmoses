class ProductModel1 {
    public id: number = 0
    public name: string = '';
    public price: number = 0;
    public image?: FileList | any |undefined;
  public count: number =0;
  public totalprice: number =0;
    public static convertToFormData(product: ProductModel1): FormData {
      const myFormData = new FormData();
      myFormData.append('name', product.name);
      myFormData.append('price', product.price.toString());
      if(product.count){
      myFormData.append('count', product.price.toString());}
      if (product.image instanceof FileList) {
        myFormData.append('image', product.image.item(0) as Blob);
      }
  
      return myFormData;
    }
  }
  
  export default ProductModel1;
  