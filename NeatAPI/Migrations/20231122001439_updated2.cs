using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NeatAPI.Migrations
{
    /// <inheritdoc />
    public partial class updated2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Availability_Users_UserId",
                table: "Availability");

            migrationBuilder.DropForeignKey(
                name: "FK_NeatBookings_Services_ServiceId",
                table: "NeatBookings");

            migrationBuilder.DropIndex(
                name: "IX_NeatBookings_ServiceId",
                table: "NeatBookings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Availability",
                table: "Availability");

            migrationBuilder.RenameTable(
                name: "Availability",
                newName: "Availabilities");

            migrationBuilder.RenameIndex(
                name: "IX_Availability_UserId",
                table: "Availabilities",
                newName: "IX_Availabilities_UserId");

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "NeatBookings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Availabilities",
                table: "Availabilities",
                column: "AvailabilityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Availabilities_Users_UserId",
                table: "Availabilities",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Availabilities_Users_UserId",
                table: "Availabilities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Availabilities",
                table: "Availabilities");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "NeatBookings");

            migrationBuilder.RenameTable(
                name: "Availabilities",
                newName: "Availability");

            migrationBuilder.RenameIndex(
                name: "IX_Availabilities_UserId",
                table: "Availability",
                newName: "IX_Availability_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Availability",
                table: "Availability",
                column: "AvailabilityId");

            migrationBuilder.CreateIndex(
                name: "IX_NeatBookings_ServiceId",
                table: "NeatBookings",
                column: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Availability_Users_UserId",
                table: "Availability",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_NeatBookings_Services_ServiceId",
                table: "NeatBookings",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
