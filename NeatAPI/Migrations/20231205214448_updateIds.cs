using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NeatAPI.Migrations
{
    /// <inheritdoc />
    public partial class updateIds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "TeamMembers",
                newName: "TeamMemberId");

            migrationBuilder.AddColumn<int>(
                name: "TeamMemberId",
                table: "Availabilities",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TeamMemberId",
                table: "Availabilities");

            migrationBuilder.RenameColumn(
                name: "TeamMemberId",
                table: "TeamMembers",
                newName: "Id");
        }
    }
}
