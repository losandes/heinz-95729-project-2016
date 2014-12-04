/*jslint nomen: true*/
/*global define*/
define('models/payment', {
    init: function (ko, viewEngine) {
        "use strict";

        if (!ko) {
            throw new Error('Argument Exception: ko is required to init the product module');
        }

        function stripeResponseHandler(status, response) {
            //var form = $('#payment-form');
            if (response.error) {
                // form.find('.payment-errors').text(response.error.message);
                // form.find('button').prop('disabled', false);
            } else {
                var token = response.id;
                window.location.href = '/#/confirmation';
            }
        };

        var Payment = function(cart) {
            var self = this;

            self.cart = cart;
            self.cardNum = ko.observable();
            self.cvc = ko.observable();
            self.expMonth = ko.observable();
            self.expYear = ko.observable();
            self.billingName = ko.observable();
            self.billingAddr1 = ko.observable();
            self.billingAddr2 = ko.observable();
            self.billingCity = ko.observable();
            self.billingState = ko.observable();
            self.billingZip = ko.observable();
            self.billingCountry = ko.observable();

            self.submitPay = function () {
                Stripe.card.createToken({
                    number: self.cardNum(),
                    cvc: self.cvc(),
                    exp_month: self.expMonth(),
                    exp_year: self.expYear()
                }, stripeResponseHandler);
            };

            self.editCart = function () {
                window.location.href = "/#/cart";
            };

        };

        return Payment;
    }
});