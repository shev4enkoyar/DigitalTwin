using Microservice.MapManager.Clients;
using Microservice.MapManager.DAL;
using Microservice.MapManager.DAL.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.MapManager
{
    public class MapHub : Hub<IMapClient>
    {
        private readonly ApplicationContext _dbContext;

        private static int MapId { get; set; }
        public MapHub(ApplicationContext dbContext) => _dbContext = dbContext;

        #region SignalR

        public override async Task OnConnectedAsync() => await Task.CompletedTask;

        public override Task OnDisconnectedAsync(Exception exception) => base.OnDisconnectedAsync(exception);

        /// <summary>
        /// Send figure to the server for add or update.
        /// </summary>
        /// <param name="figure">Figure for add or update</param>
        /// <returns>When adding a figure its ID will be returned</returns>
        public Task SendFigure(FigureInfo figure)
        {
            var model = new Figure()
            {
                MapId = figure.MapId,
                CategoryId = figure.CategoryId,
                Points = figure.Points
            };

            if (figure.Id != null)
            {
                model.Id = figure.Id.Value;
                _dbContext.Figures.Update(model);
                _dbContext.SaveChanges();
            }
            else
            {
                _dbContext.Figures.Add(model);
                _dbContext.SaveChanges();
                Clients.Caller.Recive(model.Id);
            }

            return Task.CompletedTask;
        }

        /// <summary>
        /// Deleting a figure by its ID
        /// </summary>
        /// <param name="figureId">ID figure</param>
        public Task RemoveFigure(int figureId)
        {
            var figure = _dbContext.Figures.FirstOrDefault(x => x.Id == figureId);
            if (figure == null) return null;
            _dbContext.Figures.Remove(figure);
            _dbContext.SaveChanges();
            return Task.CompletedTask;
        }

        public Task SendProductArea(string productArea)
        {
            if (productArea == null) return null;
            var map = _dbContext.Maps.FirstOrDefault(x => x.Id == MapId);
            if (map == null)
                return Task.CompletedTask;
            map.ProductArea = productArea;
            _dbContext.Maps.Update(map);
            _dbContext.SaveChanges();
            return Task.CompletedTask;
        }

        public async Task SendMapId(int mapId)
        {
            MapId = mapId;

            var map = _dbContext.Maps.FirstOrDefault(x => x.Id == mapId);
            if (map == null) {
                await Clients.Caller.ReciveIfCadaster(false);
                return;
            }
            var isCadasterExist = !string.IsNullOrEmpty(map.Cadaster);
            await Clients.Caller.ReciveIfCadaster(isCadasterExist);
        }
        #endregion
    }
}