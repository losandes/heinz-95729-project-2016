namespace Moviq.Locale
{
    using Moviq.Interfaces.Models;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Concurrent;
    using System.IO;

    public class AnyLocale
    {
        private ConcurrentDictionary<string, ILocale> locales = new ConcurrentDictionary<string, ILocale> { };

        private bool LocaleIsLoaded(string filePath) 
        {
            return locales.ContainsKey(filePath);
        }

        private bool LoadLocale(string filePath) 
        {
            using (StreamReader r = new StreamReader(filePath))
            {
                string json = r.ReadToEnd();
                return locales.TryAdd(filePath, JsonConvert.DeserializeObject<DefaultLocale>(json));
            }
        }
        
        public ILocale GetLocale(string filePath) 
        {
            try
            {
                var locale = default(ILocale);

                if (!LocaleIsLoaded(filePath) && LoadLocale(filePath))
                {
                    locales.TryGetValue(filePath, out locale);
                    return locale;
                }
                else if (LocaleIsLoaded(filePath))
                {
                    locales.TryGetValue(filePath, out locale);
                    return locale;
                }

                throw new Exception();
            }
            catch (Exception e) 
            {
                throw new Exception(String.Format("The locale at path, ::{0}::, could not be loaded", filePath), e);
            }
        }

        public void Reset()
        {
            locales = new ConcurrentDictionary<string, ILocale> { };
        }
    }
}
