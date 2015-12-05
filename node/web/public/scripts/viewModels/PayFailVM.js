/**
 * Created by willQian on 2015/12/5.
 */
Hilary.scope('heinz').register({
    name: 'PaymentFailVM',
    dependencies: [],
    factory: function () {
        'use strict';

        var PaymentFailVM;

        //payment details
        PaymentFailVM = function () {
            window.onload = function () {
                setTimeout("window.location.replace('/cart')", 3000);
            }
        };
        return PaymentFailVM;
    }
});