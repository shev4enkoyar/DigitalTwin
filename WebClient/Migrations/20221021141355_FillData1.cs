using Microsoft.EntityFrameworkCore.Migrations;

namespace WebClient.Migrations
{
    public partial class FillData1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Description", "Discriminator", "FunctionalAccess", "Name", "NormalizedName", "TranslatedName" },
                values: new object[] { "186c754b-2666-4d5c-a126-ae40728d4d7e", "5a962a43-930f-455f-8633-c901f259ae86", "", "ApplicationRole", "1;2", "Maintainer", "MAINTAINER", "Владелец компании" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "186c754b-2666-4d5c-a126-ae40728d4d7e");
        }
    }
}
