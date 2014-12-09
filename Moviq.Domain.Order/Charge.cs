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
        public String BuildStripePostRequest(double amount, string desc, string token)
        {
            //Source: http://stackoverflow.com/questions/26416252/restsharp-how-to-add-key-value-pair-as-parameter
            //string secretKey = ConfigurationManager.AppSettings["StripeApiKey"];
            var secretKey = "sk_test_hXJllj8ykA6fkc8xh3lMmxf2"; //your secret key
            const string baseUrl = "https://api.stripe.com/";
            const string endPoint = "v1/charges";

            var client = new RestClient(baseUrl)
            {
                Authenticator = new HttpBasicAuthenticator(secretKey, "")
            };
            //var chargeParam = "{\"amount\":\"" + amount + "\", \"currency\":\"usd\", \"description\":\"" + desc + "\", \"capture\":false, \"cardToken\":\"" + token + "\"}";

            var request = new RestRequest(endPoint, Method.POST);
            request.AddParameter("card", token);
            request.AddParameter("amount", amount*100);
            request.AddParameter("currency", "usd");
            request.AddParameter("description", desc);
            
            
            /*
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Authorization", secretKey);
            request.AddParameter("text/json", chargeParam, ParameterType.RequestBody);
            */
            



            // execute the request
            var response = (RestResponse)client.Execute(request);
            var chargeResult = response.Content; // raw content as string

            return chargeResult;
        }
    }
}
