'use strict'

class SmsaRequest{

      addShip(order, passKey){

        let details = this.getOrderDetails(order.items);
        console.log("details", order);
        // map json values to xml elemets
       // let codAmt = (order.shipment.payment_type === 'COD') ? details.totalAmount : 0 ;
       let codAmt = (order.shipment.totalAmount) ? order.shipment.totalAmount : 0 ;
          let xml = ` <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:sms="http://track.smsaexpress.com/secom/SMSAWebserviceIntl">
          <soap:Header/>
          <soap:Body>
             <sms:addShip>
                <!--Optional:-->
                <sms:passKey>${passKey}</sms:passKey>
                <!--Optional:-->
                <sms:refNo>${order.id}</sms:refNo>
                <!--Optional:-->
                <sms:sentDate>${order.updatedAt}</sms:sentDate>
                <!--Optional:-->
                <sms:idNo>0</sms:idNo>
                <!--Optional:-->
                <sms:cName>${order.receiver.contact_name}</sms:cName>
                <!--Optional:-->
                <sms:cntry>${order.receiver.country}</sms:cntry>
                <!--Optional:-->
                <sms:cCity>${order.receiver.city}</sms:cCity>
                <!--Optional:-->
                <sms:cZip>${order.receiver.postal_code}</sms:cZip>
                <!--Optional:-->
                <sms:cPOBox>0</sms:cPOBox>
                <!--Optional:-->
                <sms:cMobile>${order.receiver.phone}</sms:cMobile>
                <!--Optional:-->
                <sms:cTel1>${order.receiver.phone}</sms:cTel1>
                <!--Optional:-->
                <sms:cTel2>0</sms:cTel2>
                <!--Optional:-->
                <sms:cAddr1>${order.receiver.street1}</sms:cAddr1>
                <!--Optional:-->
                <sms:cAddr2></sms:cAddr2>
                <!--Optional:-->
                <sms:shipType>DLV</sms:shipType>
                <sms:PCs>${details.quantity}</sms:PCs>
                <!--Optional:-->
                <sms:cEmail>${order.receiver.email}</sms:cEmail>
                <!--Optional:-->
                <sms:carrValue></sms:carrValue>
                <!--Optional:-->
                <sms:carrCurr></sms:carrCurr>
                <!--Optional:-->
                <sms:codAmt>${codAmt}</sms:codAmt>
                <!--Optional:-->
                <sms:weight>${details.weight}</sms:weight>
                <!--Optional:-->
                <sms:custVal></sms:custVal>
                <!--Optional:-->
                <sms:custCurr></sms:custCurr>
                <!--Optional:-->
                <sms:insrAmt></sms:insrAmt>
                <!--Optional:-->
                <sms:insrCurr></sms:insrCurr>
                <!--Optional:-->
                <sms:itemDesc>${details.description}</sms:itemDesc>
                <!--Optional:-->
                <sms:sName>${order.address.company_name}</sms:sName>
                <!--Optional:-->
                <sms:sContact>${order.address.contact_name}</sms:sContact>
                <!--Optional:-->
                <sms:sAddr1>${order.address.street1}</sms:sAddr1>
                <!--Optional:-->
                <sms:sAddr2>${order.address.street2}</sms:sAddr2>
                <!--Optional:-->
                <sms:sCity>${order.address.city}</sms:sCity>
                <!--Optional:-->
                <sms:sPhone>${order.address.phone}</sms:sPhone>
                <!--Optional:-->
                <sms:sCntry>${order.address.country}</sms:sCntry>
                <!--Optional:-->
                <sms:prefDelvDate>"11-9-2019"</sms:prefDelvDate>
                <!--Optional:-->
                <sms:gpsPoints>${order.receiver.latitude}, ${order.receiver.longitude}</sms:gpsPoints>
                <!--Optional:-->
                <sms:vatValue></sms:vatValue>
                <!--Optional:-->
                <sms:harmCode></sms:harmCode>
             </sms:addShip>
          </soap:Body>
       </soap:Envelope> `;

        return xml;
          
      }

      getPDF(passKey, awb){

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sms="http://track.smsaexpress.com/secom/SMSAWebserviceIntl">

                        <soapenv:Header/>
                    
                        <soapenv:Body>
                    
                        <sms:getPDF>
                    
                            <!--Optional:-->
                    
                            <sms:awbNo>${awb}</sms:awbNo>
                    
                            <!--Optional:-->
                    
                            <sms:passKey>${passKey}</sms:passKey>
                    
                        </sms:getPDF>
                    
                        </soapenv:Body>
                    
                    </soapenv:Envelope>`;

         return xml;       
      }


      getOrderDetails(items) {
        let totalAmount = 0;
        let description = "";
        let weight = 0;
        let quantity = 0;
        items.forEach((item) => {
            totalAmount += item.price.amount * item.quantity;
            description += item.description;
            quantity += item.quantity;
            weight += item.weight.value * item.quantity;
        });
        return { 
                "totalAmount" : totalAmount,
                "description": description,
                "weight" : weight,
                "quantity" : quantity
                }
            
    }

}

module.exports = SmsaRequest;