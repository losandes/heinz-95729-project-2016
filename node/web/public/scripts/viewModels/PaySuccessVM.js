/**
 * Created by willQian on 2015/12/5.
 */
Hilary.scope('heinz').register({
    name: 'PaymentSuccessVM',
    dependencies: [],
    factory: function () {
        'use strict';

        var PaymentSuccessVM;

        //payment details
        PaymentSuccessVM = function () {
            window.onload = function () {
                setTimeout("window.open('http://www.amazon.com/')", 3000);
            }
        };
        return PaymentSuccessVM;
    }
});