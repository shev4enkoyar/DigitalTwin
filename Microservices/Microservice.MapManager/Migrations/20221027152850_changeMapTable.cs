using Microsoft.EntityFrameworkCore.Migrations;

namespace Microservice.MapManager.Migrations
{
    public partial class changeMapTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsCadaster",
                table: "Maps",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCadaster",
                table: "Maps");
        }
    }
}
