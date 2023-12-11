import { Component, OnInit } from '@angular/core';
import { Booking } from '../../interfaces/booking';
import { BookingService } from '../../services/booking.service';
import { TeamMember } from '../../models/team-member';
import { TeamMemberService } from '../../services/team-member.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings!: Booking[];
  teamMembers!: TeamMember[];

  constructor(
    private bookingService: BookingService,
    private teamMemberService: TeamMemberService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.teamMemberService.getTeamMembers().subscribe((teamMembers) => {
      this.teamMembers = teamMembers;

      const username = this.auth.getfullNameFromToken();
      const loggedInTeamMember = teamMembers.find((teamMember) => teamMember.userName === username);

      if (loggedInTeamMember) {
        this.bookingService.getBookings().subscribe((bookings) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          this.bookings = bookings
            .filter((booking) => booking.teamMemberId === loggedInTeamMember.teamMemberId)
            .filter((booking) => new Date(booking.dateTime) >= today)
            .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
        });
      }
    });
  }
}