namespace Microservice.MapManager.Clients
{
    public class FigureInitData
    {
        public int Id { get; set; }
        public int MapId { get; set; }

        public FigureInitData(int id, int mapId) 
        {
            Id = id;
            MapId = mapId;
        }
    }
}
