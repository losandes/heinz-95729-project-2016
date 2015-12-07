/**
 * Created by willQian on 2015/12/3.
 */
Hilary.scope('heinz').register({
    name: 'buyController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine', 'jQuery', 'Books', 'Book', 'CartVM'],
    factory: function ($this, GidgetRoute, locale, viewEngine, $, Books, Book, CartVM) {
        'use strict';

        $this.get['/book/:uid/buy_a_book'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/book/buy_a_book/' + req.params.uid,
                    method: 'GET'
                }).done(function (data) {
                    console.log(data);
                    //window.alert("You added the book to the cart.")
                    window.location.replace('/cart');
                });
            }
        });


        //Chetan - Adding functionality to add multiple items to the cart.
        $this.get['/book/:uid/addToCart'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/book/addToCart/' + req.params.uid,
                    method: 'GET'
                }).done(function (data) {
                    //console.log("chetan"+data.books.length);
                    $("#cartTotal").text(data.books.length + " item(s)");
                    //$(this).find($("cartUpdate")).removeClass('fa-shopping-cart').addClass('fa-user');
                    //document.getElementById("shoppingCartIcon").className = "fa fa-user";
                    //window.alert("You added the book to the cart.")
                    //window.location.replace('/cart');
                });
            }
        });


        $this.get['/book/:uid/delete_a_book'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/book/delete_a_book/' + req.params.uid,
                    method: 'GET'
                }).done(function (data) {
                    console.log(data);
                    window.location.replace('/cart');
                });
            }
        });

        $this.get['/book/:uid/cart'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/book/buy_a_book/' + req.params.uid,
                    method: 'GET'
                }).done(function (data) {
                    console.log(data);
                    window.location.replace('/cart');
                });
            }
        });

        $this.get['/cart'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/cart',
                    method: 'GET'
                }).done(function (data) {
                    $("#cartTotal").text(data.cart.books.length + " item(s)");
                    console.log(data);
                    viewEngine.setVM({
                        template: 't-cart',
                        data: new CartVM(data)
                    });
                });
            }
        });










        $this.get['/book/:uid'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/books/' + req.params.uid
                }).done(function (data) {
                    var book = new Book(data);

                    viewEngine.setVM({
                        template: 't-book-details',
                        data: { book: book }
                    });

                });
            }
        });

        $this.get['/books'] = new GidgetRoute({
            routeHandler: function () {
                viewEngine.setVM({
                    template: 't-book-search'
                });
            }
        });
        return $this;
    }
});
