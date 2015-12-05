Hilary.scope('heinz').register({
    name: 'Payment',
    singleton: true,
    dependencies: ['router', 'ko', 'Blueprint', 'exceptions'],
    factory: function (router, ko, Blueprint, exceptions) {
        'use strict';

        var Payment;

        Payment = function (totalValue) {
            var self = {};

            self.amount = ko.observable(totalValue);
            self.cardNum = ko.observable();
          	self.cvc = ko.observable();
          	self.expMonth = ko.observable();
          	self.expYear = ko.observable();
            self.canSubmit = ko.observable(true);

            // helper function to format output
            self.formatCurrency = function (value) {
                return "$"+value.toFixed(2);
            }
 
            // operation: requestPayment
            self.requestPayment = function() {

                // disable submit button
                self.canSubmit(false);

            	Stripe.setPublishableKey('pk_test_zOdcuCsgsySkaoRVCWNHQ8NY');			
				
				console.log("request payment called!");

				// var amount = 10.00; // amount you want to charge in cents
				  Stripe.createToken({
				    number: self.cardNum(),
				    cvc: self.cvc(),
				    exp_month: self.expMonth(),
				    exp_year: self.expYear()
				  }, self.amount(), function(status, response) {
					// when we get the token from stripe server, send it to our server
					if(response.error) {
						console.log("acqure token failed!");
                        alert(response.error.message+' Please retry.');
						// router.post("/payment", token);
					} else {
						console.log("acqure token success!");
						console.log(response);

						// token contains id, last4, and card type
                        var token = {id:response['id'], amount: self.amount()};

                        router.post("/payment", token);

					}
				});

				return false;
            };

            return self;
        };

        return Payment;

    }
});
