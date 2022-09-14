namespace WebGateway.Models
{
    public class FigureInfo
    {
        public string ModelId { get; set; }
        public string Points { get; set; }
        //TODO по Figure.Category.Name
        public string Category { get; set; }
     

        public override bool Equals(object obj)
        {
            var item = obj as FigureInfo;

            if (item == null)
            {
                return false;
            }

            return ModelId.Equals(item.ModelId) && Points.Equals(item.Points);
        }

        public override int GetHashCode()
        {
            return this.ModelId.GetHashCode() + this.Points.GetHashCode();
        }
    }
}
