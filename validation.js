import { App } from './App/App.js'

const Validation = (function() {      
    
    class Validation extends App
    {
        constructor() {
            super({
                autoload: {
                    provider: 'ValidationProvider'
                }
            });
        }
    }
    
    return Validation; 
}());

var validation = new Validation();

let validationCaller = validation.call('ValidationCaller', {proba: 'ceva'});
validationCaller.isEqual();