class receiptModel {
    public name: string = '';
    public address: string = '';
    public phone: string = '';
    public some: number = 0;
    public email: string ="";
    public products: {
      name: string;
      count: number;
    }[] | undefined;
  }
  export default receiptModel;
  