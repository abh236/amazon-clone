
  import { regenrate } from "../scripts/chekout/orderSummary.js";
  import {payment}from "../scripts/chekout/paymentSummary.js"
  import {products,loadProducts} from '../data/products.js';

  import '../data/backendpractice.js'
  loadProducts(function(){
regenrate();
payment();
  });
async function loadPage() {
  try {
    // throw 'error1';

    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      // throw 'error2';
      loadCart(() => {
        // reject('error3');
        resolve('value3');
      });
    });

  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }

  regenrate();
  renderPaymentSummary();
}
loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/