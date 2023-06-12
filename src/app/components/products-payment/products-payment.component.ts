import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import ClientModel from 'app/models/client.model';
import ProductModel1 from 'app/models/product1.model';
import receiptModel from 'app/models/receipt';
import store from 'app/redux/store';

@Component({
  selector: 'app-products-payment',
  templateUrl: './products-payment.component.html',
  styleUrls: ['./products-payment.component.css']
})
export class ProductsPaymentComponent {
  public selectedproducts: ProductModel1[] =[];
  public imageUrl = 'https://mispara.herokuapp.com/api/products/images/';
  public totalPrice: number =0;
  public client: ClientModel =new ClientModel()
  public body = new receiptModel()
  constructor(
    private http: HttpClient,
  ) {
  }
  ngOnInit(): void {
    this.selectedproducts= store.getState().productsState.products;
  this.totalPrice = store.getState().productsState.total;
}



async sendEmail() {
  this.body.some= this.totalPrice;
  let filteredArray = this.selectedproducts.map(product => ({ name: product.name, count: product.count }));
  this.body.products = filteredArray;
    const url = 'https://mispara.herokuapp.com/api/mail';
  await this.http.post(url, { recipient: 'recipient-email@example.com', subject: 'לקוח קנה מוצרים', body: this.body }).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
    );
}


title = 'Google Pay Demo';


paymentRequest: google.payments.api.PaymentDataRequest = {
  apiVersion: 2,
  apiVersionMinor: 0,
  
  allowedPaymentMethods: [
    {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD'],
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'example',
          gatewayMerchantId: 'exampleGatewayMerchantId',
        },
        
      },
      
    },
    
  ],
  merchantInfo: {
    merchantId: '12345678901234567890',
    merchantName: 'Demo Merchant',
  },
  transactionInfo: {
    totalPriceStatus: 'FINAL',
    totalPriceLabel: 'Total',    
    totalPrice: store.getState().productsState.total.toString(),
    currencyCode: 'ILS',
    countryCode: 'BE',
  },
  callbackIntents: ['PAYMENT_AUTHORIZATION'],
  
};

onLoadPaymentData = (event: Event): void => {
  const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
  console.log('load payment data', eventDetail.detail);

};

onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
  paymentData
) => {
  console.log('payment authorized', paymentData);
  this.sendEmail()
  return {
    transactionState: 'SUCCESS',
  };
};

onError = (event: ErrorEvent): void => {
  alert("משהו השתבש ולא התבצע תשלום")
  console.error('error', event.error);
};
}
