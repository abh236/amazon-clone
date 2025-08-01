import { cart  as gh} from './cart.js';
const cart = [];
const product=[
  
  {
   id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name:"Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count:87 
    },
    priceCents:1090 
  },
  {
   id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    name:"Intermediate Size Basketball",
    rating: {
      stars:4 ,
      count: 127
    },
    priceCents: 2095
  },
  {

   id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
   
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name:"Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars:4.5 ,
      count: 56
    },
    priceCents: 799
  }]
  let producthtml="";
product.forEach((product) => {
  producthtml += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count} reviews
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart" data-product-Id="${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary  js-add-to-cart">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    `
}
);


document.querySelector(".products-grid").innerHTML = producthtml;
// document.querySelectorAll('.js-add-to-cart')
//   .forEach((button) => {
//     button.addEventListener('click', () => {
//       const productId = button.dataset.productId;

//       let matchingItem;

//       cart.forEach((item) => {
//         if (productId === item.productId) {
//           matchingItem = item;
//         }
//       });

//       if (matchingItem) {
//         matchingItem.quantity += 1;
//       } else {
//         cart.push({
//           productId: productId,
//           quantity: 1
//         });

//       }
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener('click',()=>{
    console.log("Add to cart button clicked");
    const productId=button.dataset.productId;
 let matching;    
cart.forEach((cartItem) => {
  if(productId === cartItem.productId) {
   
    matching = cartItem;
  }});

  

if(matching) {
  matching.quantity++;
}
else{
cart.push({
    productId: productId,
    quantity: 1
  });

}

      console.log(cart);

      let cartQuantity = 0;

      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.cart-quantity')
        .innerHTML = cartQuantity;
    });
  });

