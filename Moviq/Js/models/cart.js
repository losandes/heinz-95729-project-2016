/*jslint nomen: true*/
/*global define*/
define('models/cart', {
    init: function (ko, viewEngine, Product) {
        "use strict";

        if (!ko) {
            throw new Error('Argument Exception: ko is required to init the cart module');
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

            $this.setUser = function (doneFunction) {                
                $.ajax({
                    url: '/api/examples/context',
                    method: 'GET'
                }).done(function (data) {
                    //Try-catch used here to catch when user is not logged in - the method returns the html for the login page if a user isn't logged in or JSON for the user's info if they are
                    try{
                        var userGuid = JSON.parse(data).Guid;
                    } catch (e) {
                        var userGuid = "GUEST";
                        console.log("User not logged in - userId set to GUEST");
                    }
                    $this.userId = userGuid;
                    doneFunction();
                });                
            }

            $this.loadSavedCart = function () {
                var guestCartId = "cart-GUEST";
                var userCartId = "cart-" + $this.userId;

                //Always want to load the guest cart data if there is any saved in localstorage
                var jsonGuestCart = getFromLocalStorage(guestCartId);                

                //If a user is logged in, load the user's cart 
                if ($this.userId != "GUEST") {
                    $.ajax({
                        url: "/api/cart/load"
                    }).done(function (loadResponse) {
                        console.log(loadResponse);
                        var response = JSON.parse(loadResponse);
                        var jsonUserCart = response.cartItems;
                        console.log("User json cart: " + jsonUserCart);

                        mergeCart(jsonGuestCart, jsonUserCart);
                    });
                } else {
                    loadProductsFromJson(jsonGuestCart);
                }

                console.log("Guest json cart: " + jsonGuestCart);
             

            }



            var mergeCart = function (guestCart, userCart) {

                //First add all of the products currently saved in the user's cart in the database to the js cart object's product array
                if (userCart !== undefined) {

                    for (var i = 0; i < userCart.length; i++) {
                        var product = new Product(userCart[i]);
                        if (!$this.isProductInCart(product)) {
                            //Increment the cart count
                            viewEngine.headerVw.addToCart();
                            //Add product to products array
                            $this.products.push(product);
                        }
                    }
                }


                //Next loop through the guest cart and add all of those items to the user's cart in database
                if (guestCart !== undefined) {
                    for (var i = 0; i < guestCart.products.length; i++) {
                        //loads product into cart.js products array, increments the cart counter and saves the product to the user's cart in the database
                        $this.addToCart(new Product(guestCart.products[i]));
                    }
                }

                

                //Finally delete the guest cart from local storage
                localStorage.removeItem("cart-GUEST");
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
                }).done(function (loadResponse) {
                    console.log(loadResponse);
                    var response = JSON.parse(loadResponse);
                    console.log(response.cartItems);
                    return response.cartItems;
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

                    if ($this.userId != "GUEST") {
                        $.ajax({
                            url: "/api/cart/add/" + product.uid()
                        }).done(function (data) {
                            console.log("Add api call results: " + data);
                        });
                    }
                }               

            };

            $this.removeFromCart = function (product) {
                console.log("Remove");
                console.log(product);

                viewEngine.headerVw.subtractFromCart();
                $this.products.remove(product);
                $this.save();

                if ($this.userId != "GUEST") {
                    $.ajax({
                        url: "/api/cart/del/" + product.uid()
                    }).done(function (data) {
                        console.log("Add api call results: " + data);
                    });
                }
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
                if ($this.userId == "GUEST") {
                    var jsonData = ko.toJSON($this);
                    localStorage.setItem("cart-" + $this.userId, jsonData);
                }
            }

            $this.clean = function () {
                viewEngine.headerVw.cleanCart();
                $this.products.removeAll();
                $this.save();
            }
        };

        return Cart;
    }
});