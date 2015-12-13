Hilary.scope('heinz').register({
    name: 'PaymentVM',
    dependencies: ['jQuery', 'ko', 'router', 'Stripe','Book'],
    factory: function ($, ko, router, Stripe) {
        'use strict';

        var PaymentVM;

        //payment details
        PaymentVM = function (user) {

            var self = {
                cardNo: undefined,
                name: undefined,
                cvc: undefined,
                month: undefined,
                year: undefined,
                pay: undefined,
                books:undefined,
                amount: user.cart.totalAmount.toFixed(2)
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
            console.log(JSON.parse(localStorage.getItem('cart')).books);
            self.books = ko.observable(JSON.parse(localStorage.getItem('cart')).books);

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
                            token: response.id,
                            amount: Math.round(user.cart.totalAmount.toFixed(2) * 100)
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
                $.ajax({
                    url: "/api/clearcart",
                }).done(function(data) {
                    console.log("Cart after payment--->" + data);
                });
                window.location.replace('/paysuccess');
            };

            failurePayment = function (jqXHR) {
                console.log('failed payment');
                window.location.replace('/payfailed');
            };

            return self;
        };

        return PaymentVM;
    }
});