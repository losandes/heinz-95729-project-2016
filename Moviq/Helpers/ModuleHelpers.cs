namespace Moviq.Helpers
{
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    public interface IModuleHelpers 
    {
        string ToJson(object obj);
    }

    public class ModuleHelpers : IModuleHelpers
    {
        /// <summary>
        /// Serializes an object as JSON, using camelCase
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public string ToJson(object obj)
        {
            return JsonConvert.SerializeObject(obj, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
        }
    }
}