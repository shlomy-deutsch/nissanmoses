// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  myProductsUrl: 'https://shloming-online.herokuapp.com/api/products/cart/',
  productsImageUrl: 'https://shloming-online.herokuapp.com/api/products/images/',
  searchProductUrl: 'https://shloming-online.herokuapp.com/api/products/search/',
  productsUrl: 'https://shloming-online.herokuapp.com/api/products/',
  categoriesUrl: 'https://shloming-online.herokuapp.com/api/products/categories/',
  numberOfAllOrdersURL: 'https://shloming-online.herokuapp.com/api/auth/order',
  numberOfAllProductsURL: 'https://shloming-online.herokuapp.com/api/auth/products',
  dateUrl: 'https://shloming-online.herokuapp.com/api/auth/date/',
  getcartUrl: 'https://shloming-online.herokuapp.com/api/products/carts/',
  registerUrl: 'https://shloming-online.herokuapp.com/api/auth/',
  loginUrl: 'https://shloming-online.herokuapp.com/api/auth/login/',
  newOrderUrl: 'https://shloming-online.herokuapp.com/api/products/order/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
