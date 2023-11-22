using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NeatAPI.Migrations
{
    /// <inheritdoc />
    public partial class updated5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartTime",
                table: "Availabilities",
                newName: "DateTime");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateTime",
                table: "Availabilities",
                newName: "StartTime");
        }
    }
}
