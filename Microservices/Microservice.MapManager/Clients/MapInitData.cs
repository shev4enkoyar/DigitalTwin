using Microservice.MapManager.DAL.Models;
using System.Collections.Generic;

namespace Microservice.MapManager.Clients
{
    public class MapInitData
    {
        public List<Figure> Figures { get; set; } = new List<Figure>() { new Figure() };

        public List<FigureCategory> FigureCategories { get; set; } = new List<FigureCategory>() { new FigureCategory() };
    }
}
