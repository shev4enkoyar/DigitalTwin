using Grpc.Core;
using Microservice.ForecastManager.Calculations;
using Microservice.ForecastManager.Protos;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.ForecastManager.Services
{
    public class InfluenceCalculationProtoService : InfluenceCalculationService.InfluenceCalculationServiceBase
    {
        public override Task<OverallInfluenceReply> GetOverallInfluence(OverallInfluenceRequest request, ServerCallContext context)
        {
            return Task.FromResult(new OverallInfluenceReply
            {
                Result = InfluenceCalculation
                    .GetOverallInfluence(
                        request.Dons.ToArray(),
                        request.Dots.ToArray(),
                        request.G,
                        request.GtcOptinal,
                        request.AverageTemperature,
                        request.MaxAirTemperature.ToArray(),
                        request.MinAirTemperature.ToArray(),
                        request.PrecipitationAmount.ToArray())
            });
        }

        public override Task<TaskInfluenceReply> GetTaskInfluence(TaskInfluenceRequest request, ServerCallContext context)
        {
            return Task.FromResult(new TaskInfluenceReply
            {
                Result = InfluenceCalculation
                    .GetTaskInfluence(
                        request.Dons.ToArray(),
                        request.Dots.ToArray())
            });
        }

        public override Task<WeatherInfluenceReply> GetWeatherInfluenceInfluence(WeatherInfluenceRequest request, ServerCallContext context)
        {
            return Task.FromResult(new WeatherInfluenceReply
            {
                Result = InfluenceCalculation
                    .GetWeatherInfluence(
                        request.G,
                        request.AverageTemperature,
                        request.MaxAirTemperature.ToArray(),
                        request.MinAirTemperature.ToArray(),
                        request.PrecipitationAmount.ToArray(),
                        request.GtcOptinal)
            });
        }
    }
}
