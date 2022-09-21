using Microservice.MapManager.Clients;
using Microservice.MapManager.DAL;
using Microservice.MapManager.DAL.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.MapManager
{
    public class MapHub : Hub<IMapClient>
    {
        private readonly ApplicationContext _dbContext;

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
            Figure model = new Figure()
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
            if (figure != null)
            {
                _dbContext.Figures.Remove(figure);
                _dbContext.SaveChanges();
            }
            return Task.CompletedTask;
        }

        #endregion
    }
}