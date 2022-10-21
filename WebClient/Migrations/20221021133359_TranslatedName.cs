using Microsoft.EntityFrameworkCore.Migrations;

namespace WebClient.Migrations
{
    public partial class TranslatedName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TranslatedName",
                table: "AspNetRoles",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TranslatedName",
                table: "AspNetRoles");
        }
    }
}
