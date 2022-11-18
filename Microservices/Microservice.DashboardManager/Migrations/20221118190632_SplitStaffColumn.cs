using Microsoft.EntityFrameworkCore.Migrations;

namespace Microservice.DashboardManager.Migrations
{
    public partial class SplitStaffColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Staff",
                table: "Transports",
                newName: "StaffNum");

            migrationBuilder.AddColumn<string>(
                name: "StaffName",
                table: "Transports",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StaffName",
                table: "Transports");

            migrationBuilder.RenameColumn(
                name: "StaffNum",
                table: "Transports",
                newName: "Staff");
        }
    }
}
