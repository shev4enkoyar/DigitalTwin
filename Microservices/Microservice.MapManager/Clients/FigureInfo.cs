using Microservice.MapManager.DAL.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Microservice.MapManager.Clients
{
    public class FigureInfo
    {
        public int? Id { get; set; }

        public int MapId { get; set; }

        public int CategoryId { get; set; }

        public string Points { get; set; }
    }
}
