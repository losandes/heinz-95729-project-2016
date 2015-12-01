Hilary.scope('heinz').register({
    name: 'PaymentVM',
    dependencies: ['jQuery', 'ko', 'router', 'Stripe'],
    factory: function ($, ko, router, Stripe) {
        'use strict';

        var PaymentVM;

        //payment details
        PaymentVM = function (paymentAmount) {

            var self = {
                cardNo: undefined,
                name: undefined,
                cvc: undefined,
                month: undefined,
                year: undefined,
                pay: undefined,
                amount: paymentAmount
            },
                createToken,
                chargeCardWithToken,
                confirmPayment,
                failurePayment;

            self.cardNo = ko.observable('');
            self.name = ko.observable('');
            self.cvc = ko.observable('');
            self.month = ko.observable('');
            self.year = ko.observable('');

            /**
            * Create token on click  
            */
            self.pay = function () {
                console.log(self.amount);
                console.log(self.cardNo());

                createToken({
                    number: self.cardNo(),
                    cvc: self.cvc(),
                    exp_month: self.month(),
                    exp_year: self.year()
                });

            };

            /**
            * Create token for card
            **/
            createToken = function (data) {
                Stripe.card.createToken(data, chargeCardWithToken);
            };

            /**
            * Redirect to charge card 
            **/
            chargeCardWithToken = function (status, response) {
                if (!response.error) {
                    //redirect to server
                    console.log('token:' + response.id);
                    $.ajax({
                        type: "POST",
                        url: "/api/payment/",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            token: response.id
                        })
                    }).done(confirmPayment).fail(failurePayment);

                } else {
                    //failed redirect to failure page
                }
            };
            
            /**
            * Method to return confirmation of card charge
            **/
            confirmPayment = function (data) {
                console.log('confirmed payment');
                console.log(data.charged);
            };

            failurePayment = function (jqXHR) {
                console.log('failed payment');
                
            };

            return self;
        };

        return PaymentVM;
    }
});