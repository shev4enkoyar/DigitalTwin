using Microsoft.EntityFrameworkCore.Migrations;

namespace WebClient.Migrations
{
    public partial class AddData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "926eea56-05ce-4a9c-922a-68943ab904fc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a8a110a6-8fe6-42f7-b2eb-33b71a880100");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Description", "Discriminator", "FunctionalAccess", "Name", "NormalizedName", "TranslatedName" },
                values: new object[,]
                {
                    { "2ffe9aac-b9e0-40bb-88c0-143bdb5db3cf", "1f836953-44d3-4217-b68f-eaeb8b4bde35", "", "ApplicationRole", "1;2;3;4;5;6;7;8;9;10", "Maintainer", "MAINTAINER", "Владелец компании" },
                    { "4d3ca0ea-d459-4022-b5a6-086310043ffc", "f1756dea-fd23-4a7c-919e-4b307a164408", "Danger for using", "ApplicationRole", "1;2;3;4;5;6;7;8;9;10", "Admin", "ADMIN", "Администратор" },
                    { "f1167ddd-81e5-42da-80a6-812e33818a72", "2c2e1cc7-de00-43ea-92db-2d474a09448a", "", "ApplicationRole", "1;6;7;8;10", "Agronomist", "AGRONOMIST", "Агроном" },
                    { "29223f9b-ab10-4f1e-8482-e0d8e147e25f", "526651fd-0b33-4bd2-8df6-3647c822660f", "", "ApplicationRole", "1;4;5;6;10", "Economist", "ECONOMIST", "Экономист" }
                });

            migrationBuilder.InsertData(
                table: "Functionals",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { 10, "График работ", "workDiagrame" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "29223f9b-ab10-4f1e-8482-e0d8e147e25f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2ffe9aac-b9e0-40bb-88c0-143bdb5db3cf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4d3ca0ea-d459-4022-b5a6-086310043ffc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f1167ddd-81e5-42da-80a6-812e33818a72");

            migrationBuilder.DeleteData(
                table: "Functionals",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Description", "Discriminator", "FunctionalAccess", "Name", "NormalizedName", "TranslatedName" },
                values: new object[,]
                {
                    { "926eea56-05ce-4a9c-922a-68943ab904fc", "cce904b0-b55f-473f-b019-9eb0077901ef", "", "ApplicationRole", "1;2", "Maintainer", "MAINTAINER", "Владелец компании" },
                    { "a8a110a6-8fe6-42f7-b2eb-33b71a880100", "6b18b7c6-cea5-4858-bc7e-5f10b112dac6", "Danger for using", "ApplicationRole", "1;2;3;4;5;6;7;8;9", "Admin", "ADMIN", "Администратор" }
                });
        }
    }
}
