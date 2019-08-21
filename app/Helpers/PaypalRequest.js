'use strict'

class PaypalRequest{

    addPayment(order){

        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://return.url",
                "cancel_url": "http://cancel.url"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "item",
                        "sku": "item",
                        "price": "1.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": order.currency,
                    "total": order.amount
                },
                "description": "This is the payment description."
            }]
        };

        return create_payment_json;
    }
}


module.exports = PaypalRequest;