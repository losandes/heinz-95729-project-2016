
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using Nancy;
    using Moviq.Helpers;
    using Nancy.TinyIoc;
using Moviq.Interfaces.Services;
using Moviq.Interfaces;
using Moviq.Interfaces.Models;
using Moviq.Domain.Order;

    namespace Moviq.Api
    {
        public class OrderModule : NancyModule
        {
            public OrderModule(IModuleHelpers helper, IOrderDomain orderDomain, IOrderHistoryDomain orderHistoryDomain,
                ICartDomain cartDomain)
            {
                this.Get["/api/order/get", true] = async (args, cancellationToken) =>
                {
                    //identify user and get the order
                    var amount = this.Request.Query.a;
                    var quant = this.Request.Query.q;
                    var currUser = this.Context.CurrentUser;
                    if (currUser != null)
                    {
                        ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                        string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                        IOrderHistory order;
                        order = orderHistoryDomain.Repo.Get(guid);
                        return helper.ToJson(order);
                    }
                    return helper.ToJson("user not logged in");
                };

                this.Get["/api/order/add"] = args =>
                {
                    var currUser = this.Context.CurrentUser;
                    IOrder order;
                    IOrderHistory orderHistory;
                    if (currUser != null)
                    {
                        ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                        string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                        orderHistory = orderHistoryDomain.Repo.Get(guid);

                        if (orderHistory == null)
                        {
                            orderHistory = new OrderHistory(new Guid(guid));
                        }
                        var tempOrder = this.Context.Parameters.Order;
                        ICart cart = cartDomain.Repo.Get(this.Request.Query.cartId);

                        order = new Order(cart, this.Request.Query.cardId);
                        order = orderDomain.Repo.Set(order);

                        orderHistory.addOrder(order.guid);

                        orderHistory = orderHistoryDomain.Repo.Set(orderHistory);

                        return helper.ToJson(order);
                    }
                    return helper.ToJson("user not logged in");
                };

                this.Get["/api/order/charge", true] = async (args, cancellationToken) =>
                {
                    //identify user and get the order
                    var amount = this.Request.Query.a;
                    var desc = this.Request.Query.d;
                    var token = this.Request.Query.t;

                    var currUser = this.Context.CurrentUser;
                    if (currUser != null)
                    {
                        ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                        string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                        Charge charge = new Charge();
                        return charge.BuildStripePostRequest(amount, desc, token);
                    }
                    return helper.ToJson("user not logged in");
                };
            }
        }
    }
