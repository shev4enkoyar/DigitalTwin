using Grpc.Core;
using Microservice.ForecastManager.Calculations;
using Microservice.ForecastManager.Protos;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.ForecastManager.Services
{
    /// <summary>
    /// gRPC service for yield impact calculation
    /// </summary>
    /*public class InfluenceCalculationProtoService : InfluenceCalculationService.InfluenceCalculationServiceBase
    {
        /// <summary>
        /// Method for obtaining the overall effect on yield
        /// </summary>
        /// <returns>Object of overall influence</returns>
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

        /// <summary>
        /// A method for obtaining the effect of a task on productivity
        /// </summary>
        /// <returns>Task Influence Object</returns>
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

        /// <summary>
        /// Method for obtaining the influence of weather conditions on productivity
        /// </summary>
        /// <returns>Weather Influence Object</returns>
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

        /// <summary>
        /// Method for obtaining evapotranspiration
        /// </summary>
        /// <returns>Evapotranspiration facility</returns>
        public override Task<EvapotranspirationReply> GetEvapotranspiration(EvapotranspirationRequest request, ServerCallContext context)
        {
            return Task.FromResult(new EvapotranspirationReply
            {
                Result = ForecastCalculation.GetEvapotranspiration(
                        request.Rn,
                        request.G,
                        request.P,
                        request.T,
                        request.U,
                        request.Es,
                        request.Ea,
                        request.Svpk,
                        request.Ra,
                        request.Rs
                    )
            });
        }


    }*/
}
