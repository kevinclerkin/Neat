import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from '../../services/team-member.service';
import { AuthService } from '../../services/auth.service';
import { UserRoleService } from '../../services/user-role.service';
import { charts } from 'highcharts';
import { Booking } from '../../interfaces/booking';
import { BookingService } from '../../services/booking.service';
import { TeamMember } from '../../models/team-member';
import { ServiceOption } from '../../models/service-option';
import { NeatService } from '../../services/neat-service.service';
import { Availability } from '../../interfaces/availability';
import { AvailabilityService } from '../../services/availability.service';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsExporting from 'highcharts/modules/exporting';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  teamMembers!: TeamMember[];
  bookings!: Booking[];
  availabilities!: Availability[];
  clientServices!: ServiceOption[];

  

 
  constructor(private team : TeamMemberService, private userRole: UserRoleService, private bookingService: BookingService) { }


  ngOnInit() {
    this.bookingService.getBookings().subscribe((bookings) => {
      const last30DaysBookings = this.filterLast30Days(bookings);
      const bookingsCountPerDay = this.getBookingsCountPerDay(last30DaysBookings);
    });
  }

  private filterLast30Days(bookings: any[]): any[] {
    const today = new Date();
    const last30Days = new Date(today);
    last30Days.setDate(today.getDate() - 30);

    return bookings.filter((booking) => new Date(booking.datetime) >= last30Days);
  }

  private getBookingsCountPerDay(bookings: any[]): number[] {
    const bookingsCountPerDay: number[] = [];

    for (let i = 0; i < 30; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);

      const bookingsOnCurrentDay = bookings.filter(
        (booking) => new Date(booking.datetime).toDateString() === currentDate.toDateString()
      );

      bookingsCountPerDay.unshift(bookingsOnCurrentDay.length);
    }

    return bookingsCountPerDay;
  }

  private getLast30DaysLabels(): string[] {
    const labels: string[] = [];

    for (let i = 0; i < 30; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);
      labels.unshift(this.formatDate(currentDate));
    }

    return labels;
  }

  private formatDate(date: Date): string {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  }
}


