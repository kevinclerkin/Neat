using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NeatAPI.Migrations
{
    /// <inheritdoc />
    public partial class updated9 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NeatBookings_Users_UserId",
                table: "NeatBookings");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "NeatBookings");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "NeatBookings",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_NeatBookings_Users_UserId",
                table: "NeatBookings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NeatBookings_Users_UserId",
                table: "NeatBookings");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "NeatBookings",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "NeatBookings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_NeatBookings_Users_UserId",
                table: "NeatBookings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }
    }
}
