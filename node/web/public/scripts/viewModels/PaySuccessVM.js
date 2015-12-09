/**
 * Created by willQian on 2015/12/5.
 */
Hilary.scope('heinz').register({
    name: 'PaymentSuccessVM',
    dependencies: [],
    factory: function () {
        'use strict';

        var PaymentSuccessVM,
            title;

        //payment details
        PaymentSuccessVM = function () {
            title = JSON.parse(localStorage.getItem('cart')).books[0].title;
            title = title.replace("\\W", "+");
            title = 'http://www.amazon.com/s/ref=nb_sb_ss_c_0_13?url=search-alias%3Dstripbooks&field-keywords=' + title + '&sprefix=' + title + '%2Caps%2C159';

            window.onload = function () {
                setTimeout("window.open('" + title + "')", 3000);
            }
        };
        return PaymentSuccessVM;
    }
});
