Hilary.scope('heinz').register({
    name: 'Payment',
    singleton: true,
    dependencies: ['router', 'ko', 'Blueprint', 'exceptions'],
    factory: function (router, ko, Blueprint, exceptions) {
        'use strict';

        var Payment;

        Payment = function (payment) {
            var self = {};

            self.cardNum = ko.observable();
          	self.cvc = ko.observable();
          	self.expMonth = ko.observable();
          	self.expYear = ko.observable();
 
            // operation: requestPayment
            self.requestPayment = function() {

            	Stripe.setPublishableKey('pk_test_zOdcuCsgsySkaoRVCWNHQ8NY');			
				
				console.log("request payment called!");

				var amount = 10.00; // amount you want to charge in cents
				  Stripe.createToken({
				    number: self.cardNum(),
				    cvc: self.cvc(),
				    exp_month: self.expMonth(),
				    exp_year: self.expYear()
				  }, amount, function(status, response) {
					// when we get the token from stripe server, send it to our server
					if(response.error) {
						console.log("acqure token failed!");
						// router.post("/payment", token);
					} else {
						console.log("acqure token success!");
						console.log(response);

						// token contains id, last4, and card type
                        var token = {'id':response['id']};

                        router.post("/payment", JSON.stringify(token));

					}
				});

				return false;
            };

            return self;
        };

        return Payment;

    }
});
