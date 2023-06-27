import { LightningElement, api } from 'lwc';
import {countryCodeList} from 'c/countryCodeList'
export default class CurrencyConverter extends LightningElement {
@api heading = 'Currency Converter'
// @api resultColor
// @api backgroundColor
countryList = countryCodeList;
countryFrom = "USD"
countryTo = "AUD"
fromCode
toCode
amount
finalResult


handleChange(event){
    if(event.target.name == 'countryFrom'){
        this.fromCode = event.target.value
        console.log(this.fromCode);
    }

    if(event.target.name == 'countryTo'){
        this.toCode = event.target.value
        console.log(this.toCode);

    }
    if(event.target.name == 'amount'){
       this.amount = event.target.value
       console.log(this.amount);
    }
 }
 handleClick(){
    fetch(`https://api.exchangerate.host/convert?from=${this.fromCode}&to=${this.toCode}`)
  .then(response => response.json())
  .then(data  => {
        console.log(data.result);
        this.finalResult = (Number(this.amount) * data.result).toFixed(2)
        console.log(this.finalResult)
  })
  .catch(error => console.log(error))
 }

}