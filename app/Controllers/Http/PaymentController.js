'use strict'
const Paypal = use('App/Services/Paypal');
const paypalService = new Paypal();
const BrainTree = use('App/Services/BrainTree');
const brainTreeService = new BrainTree()


class PaymentController {

    /**
 * Add new payment.
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
async addPayment ({ request, response }) {

  let responseData = {};

      // map for refelction of payment gateways objects
      let paymentMethodsMap = new Map();
      paymentMethodsMap.set('paypal', paypalService);
      paymentMethodsMap.set('braintree', brainTreeService);

  try {
    
    responseData = await paymentMethodsMap.get('paypal').createPayment(request.post());
    

  } catch (error) {
    console.log("Add new payment Throws error.................. ", error);
    responseData = error;
  }
  
  response.status(200).send(responseData); 
}

}

module.exports = PaymentController