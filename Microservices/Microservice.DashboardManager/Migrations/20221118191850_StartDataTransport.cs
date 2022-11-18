using Microsoft.EntityFrameworkCore.Migrations;

namespace Microservice.DashboardManager.Migrations
{
    public partial class StartDataTransport : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Transports",
                columns: new[] { "Id", "Brand", "Name", "StaffName", "StaffNum" },
                values: new object[,]
                {
                    { 1, "К-700, БДТ-7", "Трактор + Дисковая борона", "Тракторист", "1" },
                    { 2, "К-700, СС-6", "Сеялка", "Тракторист;Водитель автом.", "1;1" },
                    { 3, "МТЗ-82, ОП-2000 ", "Опрыскиватель", "Тракторист;Водитель автом.", "1;1" },
                    { 4, "МасДон", "Самоходная косилка", "Тракторист", "1" },
                    { 6, "Дон-1500", "Зерноуборочный комбайн", "Тракторист;Водитель автом.", "1;1" },
                    { 7, "Камаз 5320", "Автомобиль", "Водитель автом.", "1" },
                    { 8, "ОВС-25", "Очиститель зерна", "Рабочий;Водитель автом.", "2;1" },
                    { 9, "СС-19", "Сушилка", "Оператор;Рабочий", "1;2" },
                    { 10, "МТЗ-1221, ПН-5", "Тактор + плуг", "Тракторист", "1" },
                    { 11, "МТЗ1221, ПН03-310", "Трактор + активная борона", "Тракторист", "1" },
                    { 12, "МТЗ-82, КРН-4.2", "Трактор + культиватор", "Тракторист", "1" },
                    { 13, "МТЗ-82, Л-207", "Трактор + сажалка", "Тракторист;Рабочий", "1;1" },
                    { 14, "МТЗ-82, КСТ-1.4", "Трактор + копатель", "Тракторист", "1" },
                    { 15, "МТЗ-82, 2ПТС-4", "Трактор + прицеп", "Тракторист", "1" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Transports",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Transports",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Transports",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Transports",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Transports",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Transports",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Transports",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Transports",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Transports",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Transports",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Transports",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Transports",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Transports",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Transports",
                keyColumn: "Id",
                keyValue: 15);
        }
    }
}
