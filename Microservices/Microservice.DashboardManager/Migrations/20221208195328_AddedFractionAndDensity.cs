using Microsoft.EntityFrameworkCore.Migrations;

namespace Microservice.DashboardManager.Migrations
{
    public partial class AddedFractionAndDensity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Density",
                table: "DigitalModels",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Fraction",
                table: "DigitalModels",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Density",
                table: "DigitalModels");

            migrationBuilder.DropColumn(
                name: "Fraction",
                table: "DigitalModels");
        }
    }
}
