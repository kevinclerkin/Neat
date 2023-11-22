using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NeatAPI.Migrations
{
    /// <inheritdoc />
    public partial class updated4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartTime",
                table: "NeatBookings",
                newName: "DateTime");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateTime",
                table: "NeatBookings",
                newName: "StartTime");
        }
    }
}
