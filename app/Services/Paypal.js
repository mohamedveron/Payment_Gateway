'use strict'
var paypal = require('paypal-rest-sdk');
const Env = use('Env')
const client_id = Env.get('PAYPAL_CLIENT_ID')
const client_secret = Env.get('PAYPAL_CLIENT_SECRET')
//const PaypalRequest = use('App/Helpers/PaypalRequest');
//const paypalHelper = new PaypalRequest();

let _instance = null;

class Paypal{

   constructor() {
        if (!_instance)
          _instance = this;
    
        return _instance;
      }
    
    
     async createPayment(order){

        let response = {};
    
        paypal.configure({
            'mode': 'sandbox', //sandbox or live
            'client_id': client_id,
            'client_secret': client_secret
          });

          var create_payment_json = paypalHelper.addPayment(order);
        
        await paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                console.log("Create Payment Response");
                console.log(payment);
                response = payment;
            }
        });

        return response;

      }

}

module.exports = Paypal;