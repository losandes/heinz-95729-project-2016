/*jslint nomen: true*/
/*global define*/
define('models/cart', {
    init: function (ko, viewEngine, Product) {
        "use strict";

        if (!ko) {
            throw new Error('Argument Exception: ko is required to init the product module');
        }

        var Cart = function () {
            var $this = this;

            /*** Cart attributes ***/
            $this.userId;
            $this.products = ko.observableArray();
            $this.total = ko.computed(function () {
                var total = 0;
                $.each($this.products(), function () { total += this.price() })
                return total;
            });
             
            /*** Cart functions ***/
            
            $this.setupCart = function () {
                var afterSetUser = $this.loadSavedCart;
                $this.setUser(afterSetUser);
            }

            $this.setUser = function (done) {
                
                $.ajax({
                    url: '/api/examples/context',
                    method: 'GET'
                }).done(function (data) {
                    //Try-catch used here to catch when user is not logged in - the method returns the html for the login page if a user isn't logged in or JSON for the user's info if they are
                    try{
                        var userGuid = JSON.parse(data).Guid;
                    } catch (e) {
                        var userGuid = "GUEST";
                        console.log("User not logged in - caught redirect page.");
                    }
                    $this.userId = userGuid;
                    done("cart-" + $this.userId);
                });                
            }

            $this.loadSavedCart = function () {
                var guestCartId = "cart-GUEST";
                var userCartId = "cart-" + $this.userId;

                //Always want to load the guest cart data if there is any saved in localstorage
                var jsonGuestCart = getFromLocalStorage(guestCartId);                

                //If a user is logged in, load the user's cart and remove the guest cart from localstorage
                if ($this.userId != "GUEST") {
                    //var jsonUserCart = getFromLocalStorage(userCartId);    
                    var jsonUserCart = getFromServer($this.userId);
                    localStorage.removeItem(guestCartId);
                }

                loadProductsFromJson(jsonGuestCart);
                loadProductsFromJson(jsonUserCart);
            }

            

            var getFromLocalStorage = function (key) {
                var value;
                if (localStorage.getItem(key) !== null) {
                    value = JSON.parse(localStorage.getItem(key));
                }
                return value;
            }

            var getFromServer = function (userId) {
                $.ajax({
                    url: "/api/cart/load"
                }).done(function (data) {
                    console.log(data);
                });
            }

            var loadProductsFromJson = function (jsonCart) {
                if (jsonCart !== undefined) {
                    for (var i = 0; i < jsonCart.products.length; i++) {
                        $this.addToCart(new Product(jsonCart.products[i]));
                    }
                }
            }

            $this.addToCart = function (product) {
                console.log($this.isProductInCart(product));
                if (!$this.isProductInCart(product)) {
                    viewEngine.headerVw.addToCart();
                    $this.products.push(product);
                    $this.save();
                }
                
                if ($this.userId != "GUEST") {
                    $.ajax({
                        url: "/api/cart/add/" + product.uid()
                    }).done(function (data) {
                        console.log(data);
                    });
                }




            };

            $this.removeFromCart = function (product) {
                console.log("Remove");
                console.log(product);

                viewEngine.headerVw.subtractFromCart();
                $this.products.remove(product);
                $this.save();
            };

            $this.isProductInCart = function (product) {
                var inCart = false;
                $.each($this.products(), function () {
                    if (this.uid() == product.uid()) {
                        console.log("HERE");
                        inCart = true;
                    }
                })
                return inCart;
            }

            $this.save = function () {
                var jsonData = ko.toJSON($this);
                localStorage.setItem("cart-" + $this.userId, jsonData);
            }
        };

        return Cart;
    }
});