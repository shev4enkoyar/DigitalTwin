using Microsoft.EntityFrameworkCore.Migrations;

namespace WebClient.Migrations
{
    public partial class FillData2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bad35a03-22e0-4323-a309-e5dd4418f5a1");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Description", "Discriminator", "FunctionalAccess", "Name", "NormalizedName", "TranslatedName" },
                values: new object[,]
                {
                    { "ee581aa6-9cab-49ef-b375-477805680e8b", "6a836991-e94a-40b9-bde7-f32c1e8a31e8", "", "ApplicationRole", "1;2", "Maintainer", "MAINTAINER", "Владелец компании" },
                    { "04d445b2-72b4-46ab-881f-5ac35a49ff62", "9475ac8f-76fa-4cd8-8d80-1be2f105c5e9", "Danger for using", "ApplicationRole", "1;2;3;4;5;6;7;8;9", "Admin", "ADMIN", "Администратор" }
                });

            migrationBuilder.InsertData(
                table: "Functionals",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "Тех. карты компании", "models" },
                    { 2, "Создание тех. карт", "createModel" },
                    { 3, "Регистрация компании", "registerCompany" },
                    { 4, "Активированные подписки", "activatedSubscriptions" },
                    { 5, "Оформление подписок", "allSubscriptions" },
                    { 6, "Технологическая карта", "dashboard" },
                    { 7, "Карта", "map" },
                    { 8, "Рекомендательная система", "recommendation" },
                    { 9, "Приглашение в компанию", "inviteCompany" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "04d445b2-72b4-46ab-881f-5ac35a49ff62");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ee581aa6-9cab-49ef-b375-477805680e8b");

            migrationBuilder.DeleteData(
                table: "Functionals",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Functionals",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Functionals",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Functionals",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Functionals",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Functionals",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Functionals",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Functionals",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Functionals",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Description", "Discriminator", "FunctionalAccess", "Name", "NormalizedName", "TranslatedName" },
                values: new object[] { "bad35a03-22e0-4323-a309-e5dd4418f5a1", "60cbc03d-8b2a-4b57-a580-97f0499b7917", "", "ApplicationRole", "1;2", "Maintainer", "MAINTAINER", "Владелец компании" });
        }
    }
}
