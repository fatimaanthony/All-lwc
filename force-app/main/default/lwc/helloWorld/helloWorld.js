import { LightningElement, track } from 'lwc';

export default class HelloWorld extends LightningElement {
    // Data Binding Example
    fullname= "Zero to Hero"
    title = "Aura"
    
//method
    changeHandler(event){
        this.title = event.target.value
    }
    // @track binding example
    @track address={
        city:"Bangalore",
        postcode:"560066",
        country:"India"
    }
    trackHandler(event){
        this.address.city = event.target.value
    }
    // getter example
    users =["John", "Smith", "Nik"]
    num1= 10
    num2= 20
    get firstUser (){
        return this.users[2].toUpperCase()
    }
    get multiply(){
        return this.num1*this.num2
    }
}

