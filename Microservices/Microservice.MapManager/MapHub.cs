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
        private List<Figure> FigureInfos { get; } = new List<Figure>();

        private List<Figure> PolygonsInfos { get; set; }

        //TODO TEMP
        private int MapId = 1;

        MapInitData mapInitData = new MapInitData();

        private readonly ApplicationContext _dbContext;

        public MapHub(ApplicationContext dbContext) => _dbContext = dbContext;


        #region SignalR

        public override async Task OnConnectedAsync()
        {
            /*List<Figure> figures = _dbContext.Figures.Include(x => x.FigureCategory).Include(x => x.FigureCategory.Color)
                .Include(x => x.FigureCategory.FigureType).Where(x => x.MapId == MapId).ToList();
            if (figures.Any())
                mapInitData.Figures = figures;

            List<FigureCategory> categories = _dbContext.FigureCategories.Include(x => x.Color).Include(x => x.FigureType)
                .Include(x => x.Icon).ToList();
            if (categories.Any())
                mapInitData.FigureCategories = categories;*/

           

            await Task.CompletedTask;
        }

        public async Task Recive()
        {
            
            List<Figure> figures = _dbContext.Figures.Where(x => x.MapId == MapId).ToList();
            if (figures.Any())
                mapInitData.Figures = figures;

            List<FigureCategory> categories = _dbContext.FigureCategories.ToList();
            if (categories.Any())
                mapInitData.FigureCategories = categories;

            List<FigureInfo> figureInfos = new List<FigureInfo>();
            FigureInfo figureInfo = new FigureInfo() 
            { 
                CategoryId = int.MaxValue,
                Points = "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"
            };
            for (int i = 0; i < 100000; i++) {
                figureInfos.Add(figureInfo);
            }
            
            
            
            await Clients.Caller.Recive(mapInitData);
        }



        public Task SendPolygonsInfo(List<Figure> polygonsInfosFromMap)
        {
            PolygonsInfos = polygonsInfosFromMap;
            return Task.CompletedTask;
        }

        public Task SendMarkerInfo(Figure markerksInfoFromMap)
        {
            FigureInfos.Add(markerksInfoFromMap);
            return Task.CompletedTask;
        }

        public Task RemoveMarkerInfo(Figure markerksInfoFromMap) 
        {
            FigureInfos.Remove(markerksInfoFromMap);
            return Task.CompletedTask;
        }

        #endregion

        #region Methods

        private MapInitData GetMapInitData()
        {
            return new MapInitData()
            {
                FigureCategories = GetFigureCategories(),
                Figures = GetFigures()
            };
        }

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
