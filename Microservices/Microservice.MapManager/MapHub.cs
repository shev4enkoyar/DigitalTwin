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
        private List<FigureInfo> FigureInfos { get; } = new List<FigureInfo>();

        private List<Figure> PolygonsInfos { get; set; }

        //TODO TEMP
        private int MapId = 1;

        private readonly ApplicationContext _dbContext;

        public MapHub(ApplicationContext dbContext) => _dbContext = dbContext;


        #region SignalR

        public override async Task OnConnectedAsync()
        {
            await Task.CompletedTask;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            // _ = _dbContext.Figures.AddRangeAsync(FigureInfos);
            return base.OnDisconnectedAsync(exception);
        }

        public Task SendFigure(FigureInfo figure)
        {
            FigureInfos.Add(figure);
            Figure figure1 = new Figure();
            figure1.CategoryId = figure.CategoryId;
            figure1.Points = figure.Points;
            figure1.MapId = MapId;
            _dbContext.Add(figure1);
            _dbContext.SaveChanges();
            Clients.Caller.Recive(new FigureInitData(figure1.Id, figure1.MapId));
            return Task.CompletedTask;
        }

        public Task RemoveFigure(FigureInfo figure) 
        {
            FigureInfos.Remove(figure);
            return Task.CompletedTask;
        }

        #endregion

        #region Methods

        private List<Figure> GetFigures()
        {
            List<Figure> figures = _dbContext.Figures.Include(x => x.FigureCategory).Include(x => x.FigureCategory.Color)
                .Include(x => x.FigureCategory.FigureType).Where(x => x.MapId == MapId).ToList();
            if (figures.Any())
                return figures;
            return new List<Figure>() { new Figure() };
        }

        private List<FigureCategory> GetFigureCategories()
        {
            List<FigureCategory> categories = _dbContext.FigureCategories.Include(x => x.Color).Include(x => x.FigureType)
                .Include(x => x.Icon).ToList();
            if (categories.Any())
                return categories;
            return new List<FigureCategory>() { new FigureCategory() };
        }

        #endregion
    }
}
