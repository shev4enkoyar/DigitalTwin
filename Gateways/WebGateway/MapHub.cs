using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebGateway.Clients;
using WebGateway.Models;

namespace WebGateway
{
    public class MapHub : Hub<IMapClient>
    {
        static List<FigureInfo> figureInfos;
        static List<FigureInfo> polygonsInfos;
        public Task SendPolygonsInfo(List<FigureInfo> polygonsInfosFromMap)
        {
            polygonsInfos = polygonsInfosFromMap;
            return Task.CompletedTask;
        }
        public Task SendMarkerInfo(FigureInfo markerksInfoFromMap)
        {
            if (figureInfos == null)
                figureInfos = new List<FigureInfo>();
            figureInfos.Add(markerksInfoFromMap);
            return Task.CompletedTask;
        }
        public Task RemoveMarkerInfo(FigureInfo markerksInfoFromMap) 
        {
            figureInfos.Remove(markerksInfoFromMap);
            return Task.CompletedTask;
        }
        public async Task Recive(string modelId)
        {
            if ( figureInfos == null )
                figureInfos = new List<FigureInfo>();
            if ( polygonsInfos == null )
                polygonsInfos = new List<FigureInfo>();
            var allFigures = figureInfos.Concat(polygonsInfos).ToList();
            var figuresInfosFiltred = allFigures.Where(figureInfo => figureInfo.ModelId == modelId).ToList();
            if (figuresInfosFiltred.Count > 0)
                await this.Clients.Caller.ReciveFiguresInfos(figuresInfosFiltred);
        }
    }
}
