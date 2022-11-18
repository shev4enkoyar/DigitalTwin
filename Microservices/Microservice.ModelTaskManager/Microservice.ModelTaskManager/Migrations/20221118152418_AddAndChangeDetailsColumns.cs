using Microsoft.EntityFrameworkCore.Migrations;

namespace Microservice.ModelTaskManager.Migrations
{
    public partial class AddAndChangeDetailsColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SomeInfo",
                table: "Details");

            migrationBuilder.AddColumn<string>(
                name: "Fertilizers",
                table: "Details",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Pesticides",
                table: "Details",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Seeds",
                table: "Details",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Fertilizers",
                table: "Details");

            migrationBuilder.DropColumn(
                name: "Pesticides",
                table: "Details");

            migrationBuilder.DropColumn(
                name: "Seeds",
                table: "Details");

            migrationBuilder.AddColumn<string>(
                name: "SomeInfo",
                table: "Details",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
