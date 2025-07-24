import {cart, removeFromCart,updateDeliveryOption} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import { deliveryOptions ,getDeliveryOption} from '../../data/deliveryOptions.js';
import {payment} from './paymentSummary.js';
export function regenrate(){
let cartSummaryHTML = '';


cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  const matchingProduct=getProduct(productId);

 
      const deliveryOptionId=cartItem.deliveryOptionId;
      const deliveryoption =getDeliveryOption(deliveryOptionId);
   
    
    const todayDate=dayjs();
  const deliverydate = todayDate.add(deliveryoption.deliveryDays, 'day').format('dddd, MMMM D');
  
  

  cartSummaryHTML += `
    <div class="cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date:${deliverydate}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryDate(matchingProduct,cartItem)}
        </div>
      </div>
      </div>
      
  `;
    
});

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      payment();
    });
  });
  function deliveryDate(matchingProduct,cartItem)
    {
      let html="";
      const todayDate=dayjs();
      deliveryOptions.forEach((option) => {
        const deliveryDate = todayDate.add(option.deliveryDays, 'day').format('dddd, MMMM D');
        const deliveryPrice =
       option.priceCents=== 0?'FREE' :formatCurrency(option.priceCents);
       const ischecked = cartItem.deliveryOptionId == option.id;
        html+=`
        <div class="delivery-option" data-product-id=${matchingProduct.id}
        data-delivery-id=${option.id}>
          <input type="radio" ${ischecked? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${deliveryDate}
            </div>
            <div class="delivery-option-price">
              ${deliveryPrice} Shipping
            </div>
            </div>
            </div>
            
        `;
        
   

    }
      )
return html;
    }
    document.querySelectorAll('.delivery-option').forEach((option)=>{
      option.addEventListener('click',()=>{

        updateDeliveryOption(option.dataset.productId,option.dataset.deliveryId)
        regenrate();
        payment();
      })

    })}
    