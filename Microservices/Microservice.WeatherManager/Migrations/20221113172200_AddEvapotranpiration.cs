using Microsoft.EntityFrameworkCore.Migrations;

namespace Microservice.WeatherManager.Migrations
{
    public partial class AddEvapotranpiration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "EvapotranspirationAvg",
                table: "Weathers",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EvapotranspirationAvg",
                table: "Weathers");
        }
    }
}
