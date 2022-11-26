using Grpc.Core;
using Microservice.MapManager.DAL;
using Microservice.MapManager.Protos;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.MapManager.Services
{
    /// <summary>
    /// GRPS service for working with categories of figures on the map
    /// </summary>
    public class FigureCategoryProtoService : FigureCategoryService.FigureCategoryServiceBase
    {
        /// <summary>
        /// Database access property
        /// </summary>
        private readonly ApplicationContext _dbContext;
        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        /// <param name="dbContext"></param>
        public FigureCategoryProtoService(ApplicationContext dbContext) 
        {
            _dbContext = dbContext;
        }
        /// <summary>
        /// method for getting categories of shapes
        /// </summary>
        /// <returns>grps objects categories shapes</returns>
        public override async Task GetFigureCategories(FigureCategoryRequest request, IServerStreamWriter<FigureCategoryReply> responseStream, ServerCallContext context)
        {
            var reply = new FigureCategoryReply();
            reply.FigureCategories.AddRange(GetProtoFigureCategories());
            await responseStream.WriteAsync(reply);
            await Task.FromResult(reply);
        }

        private IEnumerable<FigureCategoryProto> GetProtoFigureCategories()
        {
            return _dbContext.FigureCategories
                .Include(x => x.Icon)
                .Include(x => x.Color)
                .Include(x => x.FigureType)
                .Select(x => new FigureCategoryProto()
                {
                    Icon = x.Icon.Source,
                    Color = x.Color.HEX,
                    Type = x.FigureType.Type,
                    IsUnique = x.IsUnique,
                    Id = x.Id
                });
        }

       
    }
}
