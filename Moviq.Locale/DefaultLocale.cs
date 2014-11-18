namespace Moviq.Locale
{
    using Moviq.Interfaces.Models;

    public class DefaultLocale : ILocale
    {
        public string ProductSetFailure { get; set; }
        public string UserSetFailure { get; set; }
        public string LiskovSubstitutionInfraction { get; set; }
    }
}
