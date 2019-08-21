'use strict'

let _instance = null;

class Smsa{

   constructor() {
        if (!_instance)
          _instance = this;
    
        return _instance;
      }
    
    
     createShipperAccount(shipAcc){
    
        let shipperAccount = {
          data :{
            data: {
              id: "",
              slug: shipAcc.slug,
              description: shipAcc.description,
              status: "enabled",
              type: "smsa",
              timezone: shipAcc.timezone,
              address: shipAcc.address, //json
            }
          }
            
        };
    
        return shipperAccount;
      }

}

module.exports = Smsa;