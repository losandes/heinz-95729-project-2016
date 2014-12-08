/*jslint nomen: true*/
/*global define*/
define('models/payment', {
    init: function (ko, viewEngine) {
        "use strict";

        if (!ko) {
            throw new Error('Argument Exception: ko is required to init the product module');
        }

        function stripeResponseHandler(status, response, cart) {
            //var form = $('#payment-form');
            if (response.error) {
                // form.find('.payment-errors').text(response.error.message);
                // form.find('button').prop('disabled', false);
            } else {
                var token = response.id;
                $.ajax({
                    url: "/api/cart/clean"
                }).done(function (data) {
                    console.log("Clean API call results: " + data);
                    cart.clean();
                    window.location.href = '/#/confirmation';
                });
                
            }
        };

        var Payment = function(cart) {
            var self = this;

            self.months = ko.observableArray(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]);
            self.years = ko.observableArray(["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"]);

            self.cart = cart;
            self.cardNum = ko.observable();
            self.cvc = ko.observable();
            self.expMonth = ko.observable("MM");
            self.expYear = ko.observable("YYYY");
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
                }, function (status, response) {
                    stripeResponseHandler(status, response, self.cart);
                });
            };

            self.editCart = function () {
                window.location.href = "/#/cart";
            };

        };

        return Payment;
    }
});