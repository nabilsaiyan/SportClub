using Newtonsoft.Json;

namespace webapi.Models
{
    public class CreateCheckoutSessionRequest
    {
        [JsonProperty("priceID")]
        public string PriceId { get; set; }
    }
}
