import {cart, removeFromCart,updateDeliveryOption} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import { deliveryOptions,getDeliveryOption } from '../../data/deliveryOptions.js';
export function payment()
{let itemPrice=0;
  let deliveryPrice=0;
  let html='';
  let quantity=0;
 cart.forEach((cartItem)=>{
  const productId = cartItem.productId;
 const deliveryOptionId=cartItem.deliveryOptionId;
      const deliveryoption =getDeliveryOption(deliveryOptionId);
   
  const matchingProduct=getProduct(productId);
  quantity+=cartItem.quantity;
  itemPrice+=matchingProduct.priceCents * cartItem.quantity;
deliveryPrice+=deliveryoption.priceCents;

    
 
 })
 itemPrice=(itemPrice/100);
 deliveryPrice=(deliveryPrice/100);
 let totalPriceb=itemPrice+deliveryPrice;
let tax= (totalPriceb * 0.1);
let totalPrice=(itemPrice + deliveryPrice + tax).toFixed(2);
tax=tax.toFixed(2);
totalPriceb=totalPriceb.toFixed(2);

 html+=` 
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${quantity}):</div>
            <div class="payment-summary-money">$${itemPrice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${deliveryPrice}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalPriceb}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${tax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${totalPrice}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button-primary">
            Place your order
          </button>
        </div>
      </div>`
document.querySelector('.js-payment-summary').innerHTML=html;
document.querySelector('.js-place-order-button-primary').addEventListener('click',async()=>{
     const response = await fetch('https://supersimplebackend.dev/orders',{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify({
      cart:cart
  })
  })
    const order=await response.json()
    console.log(order)
window.location.href=`orders.html`

})
}