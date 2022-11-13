using Microsoft.EntityFrameworkCore.Migrations;

namespace Microservice.DashboardManager.Migrations
{
    public partial class StartData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "ProductTypes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Овощ" },
                    { 2, "Зерновое" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Code", "CurrentPrice", "Name", "SoilMoistureMax", "SoilMoistureMin", "TypeId" },
                values: new object[,]
                {
                    { 1, "4", 0m, "Картофель;Спиридон", 90, 70, 1 },
                    { 2, "5", 0m, "Кукуруза;Кубанский101МВ", 80, 70, 2 },
                    { 3, "3", 0m, "Яровая пшеница;Эритросперум65", 75, 70, 2 },
                    { 4, "1", 0m, "Озимая пшеница;Скипетр", 75, 70, 2 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "ProductTypes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ProductTypes",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
