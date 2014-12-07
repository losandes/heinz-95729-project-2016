
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
            public OrderModule(IModuleHelpers helper, IOrderDomain orderDomain, IOrderHistoryDomain orderHistoryDomain)
            {
                this.Get["/api/order/charge", true] = async (args, cancellationToken) =>
                {
                    //identify user and get the order
                    var amount = this.Request.Query.a;
                    var quant = this.Request.Query.q;
                    var currUser = this.Context.CurrentUser;
                    if (currUser != null)
                    {
                        ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                        string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                        IOrder order;
                        order = orderDomain.Repo.Get(guid);
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

                        var tempOrder = this.Context.Parameters.Order;
                        order = new Order(tempOrder.Cart, tempOrder.Card, tempOrder.Ship);
                        order = orderDomain.Repo.Set(order);

                        orderHistory.addOrder(order.getOID());

                        orderHistory = orderHistoryDomain.Repo.Set(orderHistory);
                                                
                        return helper.ToJson(true);
                    }
                    return helper.ToJson("user not logged in");
                };
            }
        }
    }
