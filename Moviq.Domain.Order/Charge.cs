using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestSharp;
using System.Configuration;

namespace Moviq.Domain.Order
{
    public class Charge
    {
        public RestRequest BuildStripePostRequest(string amount, string desc, string token)
        {
            string secretKey = ConfigurationManager.AppSettings["StripeApiKey"];
            //var secretKey = "sk_6eeea8ca-2151-4ba6-aecc-2139465876c8"; //your secret key

            var client = new RestClient("https://api.stripe.com/v1/charges");
            var chargeParam = "{\"amount\":\"" + amount + "\", \"currency\":\"usd\", \"description\":\"" + desc + "\", \"capture\":false, \"cardToken\":\"" + token + "\"}";

            var request = new RestRequest("charges", Method.POST);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Authorization", secretKey);
            request.AddParameter("text/json", chargeParam, ParameterType.RequestBody);

            // execute the request
            var response = (RestResponse)client.Execute(request);
            var chargeResult = response.Content; // raw content as string
            return request;
        }
    }
}
