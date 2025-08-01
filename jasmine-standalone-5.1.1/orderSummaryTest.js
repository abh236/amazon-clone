import {regenrate} from '../scripts/chekout/orderSummary.js'
import {loadFromStorage } from '../data/cart.js';
import {products,loadProducts} from '../data/products.js';
loadProducts(()=>{
describe(('test suit : regenrate'),()=>{
it(('display the cart'),()=>{
  document.querySelector('.test-container').innerHTML = '<div class="js-order-summary"></div>';
    spyOn(localStorage, 'getItem').and.callFake(()=>{
        return(JSON.stringify(
           [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId:1
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId:2
  }]
        ));})
        loadFromStorage();
        regenrate();
})
})
})
