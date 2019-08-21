'use strict'

var braintree = require("braintree");
var merchantId = Env.get('BRAINTREE_MERCHANTID')
const publicKey = Env.get('BRAINTREE_PUBLIC_KEY')
const privateKey = Env.get('BRAINTREE_PRIVATE_KEY')

let _instance = null;

class BrainTree{

   constructor() {
        if (!_instance)
          _instance = this;
    
        return _instance;
      }
    
    
     async createPayment(payment){
        
        var gateway = await braintree.connect({
            environment: braintree.Environment.Sandbox,
            merchantId: merchantId,
            publicKey: publicKey,
            privateKey: privateKey
          });

          console.log(gateway);

          await gateway.clientToken.generate({
            customerId: 2
          }, function (err, response) {
            var clientToken = response.clientToken
            console.log(clientToken);
          });
        
      }

}

module.exports = BrainTree;