class ProductModel {
  public id: number = 0;
  public name: string = '';
  public phone: string = '';
  public barber: string = '';
  public type: string = '';
  public date: string = '';
  public time: string = '';

  public static convertToFormData(product: ProductModel): FormData {
    console.log(product);
    
    const myFormData = new FormData();
    myFormData.append('name', product.name);
    myFormData.append('phone', product.phone);
    myFormData.append('barber', product.barber);
    myFormData.append('type', product.type);
    myFormData.append('date', product.date);
    myFormData.append('time', product.time);
    console.log('FormData:', myFormData);

    return myFormData;
  }
}
export default ProductModel;
