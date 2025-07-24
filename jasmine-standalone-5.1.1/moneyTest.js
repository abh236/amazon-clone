import {formatCurrency} from '../scripts/utils/money.js';
import {cart, addToCart,loadFromStorage } from '../data/cart.js';
import {products,loadProducts} from '../data/products.js';
loadProducts(function(){})
describe('test suit :formatCurrency', () => {
  it('conver cent into dollars', () => {
    expect(formatCurrency(2095)).toBe('20.95');
  });



  it('conver cent into dollars', () => {
    expect(formatCurrency(123456)).toBe('1234.56');
  });
 
});
 describe('test suit :addToCart', () => {
    it('add new product to cart', () => {
      spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'getItem').and.callFake(()=>{
        return(JSON.stringify([]));})
        loadFromStorage();
      addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
      expect(cart.length ).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(1);
    })
    
    it('add existing product to cart', () => {
 spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'getItem').and.callFake(()=>{
        return(JSON.stringify(
           [{productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId:1}]
        ));})
        loadFromStorage();
      addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
      expect(cart.length ).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(3);
    })
  })
