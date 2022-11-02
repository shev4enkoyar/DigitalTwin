using Microsoft.EntityFrameworkCore.Migrations;

namespace Microservice.MapManager.Migrations
{
    public partial class ChangeMapTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCadaster",
                table: "Maps");

            migrationBuilder.AddColumn<string>(
                name: "Cadaster",
                table: "Maps",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cadaster",
                table: "Maps");

            migrationBuilder.AddColumn<bool>(
                name: "IsCadaster",
                table: "Maps",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
