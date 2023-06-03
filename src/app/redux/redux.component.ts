import ProductModel1 from '../models/product1.model';

export class ProductsState {
  public products: ProductModel1[] = [];
  public loveproducts: ProductModel1[] = [];
  public total: number = 0;
  public auth: boolean | any;

  public constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.auth = true;
    }
  }
}

export enum ProductActionType {
  setTotal = 'setTotal',
  setAuth = 'setAuth',
  setProducts = 'setProducts',
  productAdded = 'productAdded',
  productDeleted = 'productDeleted',
  setloveProducts = 'setloveProducts',
  loveproductAdded = 'loveproductAdded',
  loveproductDeleted = 'loveproductDeleted' // New action type
}

export interface ProductAction {
  type: ProductActionType;
  payload: any;
}

export function setAuth(auth: any): ProductAction {
  return { type: ProductActionType.setAuth, payload: auth };
}

export function setTotal(total: any): ProductAction {
  return { type: ProductActionType.setTotal, payload: total };
}

export function setProducts(products: ProductModel1): ProductAction {
  return { type: ProductActionType.setProducts, payload: products };
}

export function productAddedAction(product: ProductModel1): ProductAction {
  return { type: ProductActionType.productAdded, payload: product };
}

export function productDeletedAction(productId: number): ProductAction {
  return { type: ProductActionType.productDeleted, payload: productId };
}
export function setloveProducts(products: ProductModel1): ProductAction {
  return { type: ProductActionType.setloveProducts, payload: products };
}

export function loveproductAddedAction(product: ProductModel1): ProductAction {
  return { type: ProductActionType.loveproductAdded, payload: product };
}

export function loveproductDeletedAction(productId: number): ProductAction {
  return { type: ProductActionType.loveproductDeleted, payload: productId };
}

export function productsReducer(
  currentState: ProductsState = new ProductsState(),
  action: ProductAction
): ProductsState {
  const newState = { ...currentState };
  switch (action.type) {
    case ProductActionType.setAuth:
      localStorage.setItem('user', 'true')
      newState.auth = action.payload;
      break;

    case ProductActionType.setTotal:
      newState.total = action.payload;
      break;

    case ProductActionType.setProducts:
      newState.products = action.payload;
      break;

    case ProductActionType.productAdded: {
      const index = newState.products.findIndex((p: ProductModel1) => p.id === action.payload.id);
      if (index === -1) {
        newState.products.push(action.payload);
      } else {
        const existingProduct = newState.products[index];
        existingProduct.count = action.payload.count;
        existingProduct.totalprice = existingProduct.count * existingProduct.price;
      }
      break;
    }
    case ProductActionType.loveproductAdded: {
      const index = newState.loveproducts.findIndex((p: ProductModel1) => p.id === action.payload.id);
      if (index === -1) {
        newState.loveproducts.push(action.payload);
      } else {
        const existingProduct = newState.loveproducts[index];
        existingProduct.count = action.payload.count;
        existingProduct.totalprice = existingProduct.count * existingProduct.price;
      }
      console.log(newState.loveproducts);
      
      break;
    }
    
    case ProductActionType.productDeleted: {
      const productId = action.payload;
      newState.products = newState.products.filter((p: ProductModel1) => p.id !== productId);
      break;
    }
    case ProductActionType.loveproductDeleted: {
      const productId = action.payload;
      newState.loveproducts = newState.loveproducts.filter((p: ProductModel1) => p.id !== productId);
      break;
    }
  }
  return newState;
}
