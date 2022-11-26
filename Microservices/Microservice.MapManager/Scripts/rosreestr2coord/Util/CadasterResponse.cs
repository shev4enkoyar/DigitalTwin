using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Microservice.MapManager.Scripts.rosreestr2coord.Util
{
    public class CadasterResponse
    {
        public class Center
        {
            [JsonPropertyName("x")]
            public double X { get; set; }

            [JsonPropertyName("y")]
            public double Y { get; set; }
        }

        public class Coordinate
        {
            [JsonIgnore]
            public string X { get; set; }

            [JsonIgnore]
            public string Y { get; set; }

            public string GetCoordinate()
            {
                return $"{X},{Y}";
            }
        }

        public class Crs
        {
            [JsonPropertyName("type")]
            public string Type { get; set; }

            [JsonPropertyName("properties")]
            public Properties Properties { get; set; }
        }

        public class Geometry
        {
            [JsonPropertyName("type")]
            public string Type { get; set; }

            [JsonPropertyName("coordinates")]
            public List<List<List<List<double>>>> Coordinates { get; set; }
        }

        public class Properties
        {
            [JsonPropertyName("area_unit")]
            public string AreaUnit { get; set; }

            [JsonPropertyName("sale_date")]
            public object SaleDate { get; set; }

            [JsonPropertyName("address")]
            public string Address { get; set; }

            [JsonPropertyName("application_date")]
            public string ApplicationDate { get; set; }

            [JsonPropertyName("area_type")]
            public string AreaType { get; set; }

            [JsonPropertyName("area_value")]
            public double AreaValue { get; set; }

            [JsonPropertyName("rifr_cnt")]
            public object RifrCnt { get; set; }

            [JsonPropertyName("parcel_tour_attrs")]
            public object ParcelTourAttrs { get; set; }

            [JsonPropertyName("cn")]
            public string Cn { get; set; }

            [JsonPropertyName("cad_unit")]
            public string CadUnit { get; set; }

            [JsonPropertyName("util_by_doc")]
            public string UtilByDoc { get; set; }

            [JsonPropertyName("cc_date_entering")]
            public string CcDateEntering { get; set; }

            [JsonPropertyName("sale_dep_uo")]
            public object SaleDepUo { get; set; }

            [JsonPropertyName("rifr_dep_info")]
            public object RifrDepInfo { get; set; }

            [JsonPropertyName("sale_dep")]
            public object SaleDep { get; set; }

            [JsonPropertyName("parcel_build_attrs")]
            public object ParcelBuildAttrs { get; set; }

            [JsonPropertyName("rifr_dep")]
            public object RifrDep { get; set; }

            [JsonPropertyName("sale_price")]
            public object SalePrice { get; set; }

            [JsonPropertyName("children")]
            public object Children { get; set; }

            [JsonPropertyName("date_cost")]
            public string DateCost { get; set; }

            [JsonPropertyName("sale_cnt")]
            public object SaleCnt { get; set; }

            [JsonPropertyName("sale_doc_type")]
            public object SaleDocType { get; set; }

            [JsonPropertyName("id")]
            public string Id { get; set; }

            [JsonPropertyName("sale_doc_num")]
            public object SaleDocNum { get; set; }

            [JsonPropertyName("kvartal_cn")]
            public string KvartalCn { get; set; }

            [JsonPropertyName("parcel_tour")]
            public bool ParcelTour { get; set; }

            [JsonPropertyName("parcel_type")]
            public string ParcelType { get; set; }

            [JsonPropertyName("parcel_build")]
            public bool ParcelBuild { get; set; }

            [JsonPropertyName("statecd")]
            public string Statecd { get; set; }

            [JsonPropertyName("fp")]
            public int Fp { get; set; }

            [JsonPropertyName("kvartal")]
            public string Kvartal { get; set; }

            [JsonPropertyName("rifr")]
            public object Rifr { get; set; }

            [JsonPropertyName("category_type")]
            public string CategoryType { get; set; }

            [JsonPropertyName("cc_date_approval")]
            public string CcDateApproval { get; set; }

            [JsonPropertyName("sale")]
            public object Sale { get; set; }

            [JsonPropertyName("cad_cost")]
            public double CadCost { get; set; }

            [JsonPropertyName("sale_doc_date")]
            public object SaleDocDate { get; set; }

            [JsonPropertyName("is_big")]
            public bool IsBig { get; set; }

            [JsonPropertyName("center")]
            public Center Center { get; set; }

            [JsonPropertyName("name")]
            public string Name { get; set; }
        }

        public class Root
        {
            [JsonPropertyName("type")]
            public string Type { get; set; }

            [JsonPropertyName("properties")]
            public Properties Properties { get; set; }

            [JsonPropertyName("geometry")]
            public Geometry Geometry { get; set; }

            [JsonPropertyName("crs")]
            public Crs Crs { get; set; }
        }
    }
}
