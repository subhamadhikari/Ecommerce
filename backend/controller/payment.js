const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId:   'gnyphcbcyxtcb422',
  publicKey:    'hf492vv26krxj9bn',
  privateKey:   '8099e4a0c343a9175b2c3cd6b04fc336'
});

const getToken = (req,res) => {
    gateway.clientToken.generate({
        // customerId: aCustomerId
      }, (err, response) => {
        // pass clientToken to your front-end
        // const clientToken = response.clientToken
        if(err){
            console.log(err)
            res.status(400).send(err)
        }else{
            res.send(response)
        }
      });
}

const processPayment = (req,res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,

        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
        if(err){
            res.status(500).json(err)
        }else{
            res.json(result)
        }
      });


}

module.exports = {
    getToken,
    processPayment
}