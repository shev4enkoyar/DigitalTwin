using Microsoft.EntityFrameworkCore.Migrations;

namespace Microservice.DashboardManager.Migrations
{
    public partial class ChangeProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TaskList",
                table: "Products",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TaskList",
                table: "Products");
        }
    }
}
