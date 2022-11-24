using Grpc.Core;
using Microservice.MapManager.DAL;
using Microservice.MapManager.Protos;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.MapManager.Services
{
    public class FigureCategoryProtoService : FigureCategoryService.FigureCategoryServiceBase
    {
        private readonly ApplicationContext _dbContext;

        public FigureCategoryProtoService(ApplicationContext dbContext) 
        {
            _dbContext = dbContext;
        }

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
