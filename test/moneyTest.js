import {formatCurrency} from '../scripts/utils/money.js';
console.log("test suit :formatCurrency");
console.log("conver cent into dollars");

if(formatCurrency(2095)==='20.95') {
  console.log("test passed");
}
else{
  console.log("test failed")
}