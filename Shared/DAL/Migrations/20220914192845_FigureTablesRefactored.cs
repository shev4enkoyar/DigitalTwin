using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DAL.Migrations
{
    public partial class FigureTablesRefactored : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Figures_Colors_ColorId",
                table: "Figures");

            migrationBuilder.DropForeignKey(
                name: "FK_Figures_DigitalModels_ModelId",
                table: "Figures");

            migrationBuilder.DropForeignKey(
                name: "FK_Figures_Icons_IconId",
                table: "Figures");

            migrationBuilder.DropIndex(
                name: "IX_Figures_ColorId",
                table: "Figures");

            migrationBuilder.DropIndex(
                name: "IX_Figures_IconId",
                table: "Figures");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Icons",
                table: "Icons");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Colors",
                table: "Colors");

            migrationBuilder.DropColumn(
                name: "ColorId",
                table: "Figures");

            migrationBuilder.DropColumn(
                name: "IconId",
                table: "Figures");

            migrationBuilder.DropColumn(
                name: "IsUnique",
                table: "Figures");

            migrationBuilder.RenameTable(
                name: "Icons",
                newName: "Icon");

            migrationBuilder.RenameTable(
                name: "Colors",
                newName: "Color");

            migrationBuilder.RenameColumn(
                name: "ModelId",
                table: "Figures",
                newName: "MapId");

            migrationBuilder.RenameIndex(
                name: "IX_Figures_ModelId",
                table: "Figures",
                newName: "IX_Figures_MapId");

            migrationBuilder.RenameIndex(
                name: "IX_Icons_Source",
                table: "Icon",
                newName: "IX_Icon_Source");

            migrationBuilder.RenameIndex(
                name: "IX_Colors_HEX",
                table: "Color",
                newName: "IX_Color_HEX");

            migrationBuilder.AddColumn<int>(
                name: "ColorId",
                table: "FigureCategories",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FigureTypeId",
                table: "FigureCategories",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IconId",
                table: "FigureCategories",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsUnique",
                table: "FigureCategories",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "MapId",
                table: "DigitalModels",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Icon",
                table: "Icon",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Color",
                table: "Color",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "FigureTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Type = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FigureTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Maps",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Maps", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FigureCategories_ColorId",
                table: "FigureCategories",
                column: "ColorId");

            migrationBuilder.CreateIndex(
                name: "IX_FigureCategories_FigureTypeId",
                table: "FigureCategories",
                column: "FigureTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_FigureCategories_IconId",
                table: "FigureCategories",
                column: "IconId");

            migrationBuilder.CreateIndex(
                name: "IX_DigitalModels_MapId",
                table: "DigitalModels",
                column: "MapId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DigitalModels_Maps_MapId",
                table: "DigitalModels",
                column: "MapId",
                principalTable: "Maps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FigureCategories_Color_ColorId",
                table: "FigureCategories",
                column: "ColorId",
                principalTable: "Color",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FigureCategories_FigureTypes_FigureTypeId",
                table: "FigureCategories",
                column: "FigureTypeId",
                principalTable: "FigureTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FigureCategories_Icon_IconId",
                table: "FigureCategories",
                column: "IconId",
                principalTable: "Icon",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Figures_Maps_MapId",
                table: "Figures",
                column: "MapId",
                principalTable: "Maps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DigitalModels_Maps_MapId",
                table: "DigitalModels");

            migrationBuilder.DropForeignKey(
                name: "FK_FigureCategories_Color_ColorId",
                table: "FigureCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_FigureCategories_FigureTypes_FigureTypeId",
                table: "FigureCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_FigureCategories_Icon_IconId",
                table: "FigureCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_Figures_Maps_MapId",
                table: "Figures");

            migrationBuilder.DropTable(
                name: "FigureTypes");

            migrationBuilder.DropTable(
                name: "Maps");

            migrationBuilder.DropIndex(
                name: "IX_FigureCategories_ColorId",
                table: "FigureCategories");

            migrationBuilder.DropIndex(
                name: "IX_FigureCategories_FigureTypeId",
                table: "FigureCategories");

            migrationBuilder.DropIndex(
                name: "IX_FigureCategories_IconId",
                table: "FigureCategories");

            migrationBuilder.DropIndex(
                name: "IX_DigitalModels_MapId",
                table: "DigitalModels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Icon",
                table: "Icon");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Color",
                table: "Color");

            migrationBuilder.DropColumn(
                name: "ColorId",
                table: "FigureCategories");

            migrationBuilder.DropColumn(
                name: "FigureTypeId",
                table: "FigureCategories");

            migrationBuilder.DropColumn(
                name: "IconId",
                table: "FigureCategories");

            migrationBuilder.DropColumn(
                name: "IsUnique",
                table: "FigureCategories");

            migrationBuilder.DropColumn(
                name: "MapId",
                table: "DigitalModels");

            migrationBuilder.RenameTable(
                name: "Icon",
                newName: "Icons");

            migrationBuilder.RenameTable(
                name: "Color",
                newName: "Colors");

            migrationBuilder.RenameColumn(
                name: "MapId",
                table: "Figures",
                newName: "ModelId");

            migrationBuilder.RenameIndex(
                name: "IX_Figures_MapId",
                table: "Figures",
                newName: "IX_Figures_ModelId");

            migrationBuilder.RenameIndex(
                name: "IX_Icon_Source",
                table: "Icons",
                newName: "IX_Icons_Source");

            migrationBuilder.RenameIndex(
                name: "IX_Color_HEX",
                table: "Colors",
                newName: "IX_Colors_HEX");

            migrationBuilder.AddColumn<int>(
                name: "ColorId",
                table: "Figures",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IconId",
                table: "Figures",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsUnique",
                table: "Figures",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Icons",
                table: "Icons",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Colors",
                table: "Colors",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Figures_ColorId",
                table: "Figures",
                column: "ColorId");

            migrationBuilder.CreateIndex(
                name: "IX_Figures_IconId",
                table: "Figures",
                column: "IconId");

            migrationBuilder.AddForeignKey(
                name: "FK_Figures_Colors_ColorId",
                table: "Figures",
                column: "ColorId",
                principalTable: "Colors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Figures_DigitalModels_ModelId",
                table: "Figures",
                column: "ModelId",
                principalTable: "DigitalModels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Figures_Icons_IconId",
                table: "Figures",
                column: "IconId",
                principalTable: "Icons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
