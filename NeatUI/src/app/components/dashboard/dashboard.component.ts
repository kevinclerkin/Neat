import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from '../../services/team-member.service';
import { AuthService } from '../../services/auth.service';
import { UserRoleService } from '../../services/user-role.service';
import { Booking } from '../../interfaces/booking';
import { BookingService } from '../../services/booking.service';
import { TeamMember } from '../../models/team-member';
import { ServiceOption } from '../../models/service-option';
import { NeatService } from '../../services/neat-service.service';
import { Availability } from '../../interfaces/availability';
import { AvailabilityService } from '../../services/availability.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  teamMembers!: TeamMember[];
  bookings!: Booking[];
  availabilities!: Availability[];
  clientServices!: ServiceOption[];
  nextBooking: Booking | undefined;
  mostPopularServiceName: string = '';
  mostPopularTime: string | undefined;
  mostPopularDay: string | undefined;
  bookingsThisWeek: number = 0;
  bookingsThisMonth: number = 0;
  uniqueClientEmails: number = 0;

  constructor(
    private team: TeamMemberService,
    private userRole: UserRoleService,
    private bookingService: BookingService,
    private neatService: NeatService,
  ) {}

  ngOnInit() {
    this.bookingService.getBookings().subscribe((bookings) => {
      this.bookings = bookings;

      // Call the method to find the next booking
      this.findNextBooking();

      // Call the method to calculate the most popular service
      this.calculateMostPopularService();

      this.findMostPopularTime();

      this.findMostPopularDay();

      this.getBookingsThisWeek();

      this.getBookingsThisMonth();

      this.calculateUniqueClientEmails();

      
    });

    
  }

  private findMostPopularDay(): void {
    if (this.bookings && this.bookings.length > 0) {
      const daysMap = new Map<string, number>();

      this.bookings.forEach((booking) => {
        const bookingDay = new Date(booking.dateTime).toLocaleDateString('en-US', { weekday: 'long' });
        daysMap.set(bookingDay, (daysMap.get(bookingDay) || 0) + 1);
      });

      const sortedDays = Array.from(daysMap.entries()).sort((a, b) => b[1] - a[1]);

      if (sortedDays.length > 0) {
        this.mostPopularDay = sortedDays[0][0];
      }
    }
  }




  

  private findMostPopularTime(): void {
    if (this.bookings && this.bookings.length > 0) {
      const times: { [key: string]: number } = {};

      this.bookings.forEach((booking) => {
        const bookingTime = new Date(booking.dateTime).toLocaleTimeString('en-US');
        times[bookingTime] = (times[bookingTime] || 0) + 1;
      });

      const mostPopularTime = Object.keys(times).reduce((a, b) => (times[a] > times[b] ? a : b));

      this.mostPopularTime = mostPopularTime;
    }
  }

  private findNextBooking(): void {
    if (this.bookings && this.bookings.length > 0) {
      const sortedBookings = this.bookings.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
      const currentDate = new Date();
      this.nextBooking = sortedBookings.find((booking) => new Date(booking.dateTime) > currentDate);
    }
  }

  private calculateMostPopularService(): void {
    this.neatService.getServices().subscribe((clientServices) => {
      this.clientServices = clientServices;

      const serviceCounts: Map<number, number> = new Map();

      this.bookings.forEach((booking) => {
        const serviceId = booking.serviceId;
        if (serviceCounts.has(serviceId)) {
          serviceCounts.set(serviceId, serviceCounts.get(serviceId)! + 1);
        } else {
          serviceCounts.set(serviceId, 1);
        }
      });

      let mostPopularServiceId: number | undefined;
      let maxCount = 0;

      serviceCounts.forEach((count, serviceId) => {
        if (count > maxCount) {
          maxCount = count;
          mostPopularServiceId = serviceId;
        }
      });

      const mostPopularService = this.clientServices.find(
        (service) => service.serviceId === mostPopularServiceId
      );

      this.mostPopularServiceName = mostPopularService ? mostPopularService.serviceName : 'N/A';
    });
  }

  private getBookingsThisWeek(): void {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setHours(0, 0, 0, 0 - startOfWeek.getDay()); 
    const endOfWeek = new Date(currentDate);
    endOfWeek.setHours(23, 59, 59, 999 + (6 - endOfWeek.getDay()));
  
    const bookingsThisWeek = this.bookings.filter((booking) => {
      const bookingDate = new Date(booking.dateTime);
      return bookingDate >= startOfWeek && bookingDate <= endOfWeek;
    });
  
    this.bookingsThisWeek = bookingsThisWeek.length;
  }
  
  private getBookingsThisMonth(): void {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 12);
  
    const bookingsThisMonth = this.bookings.filter((booking) => {
      const bookingDate = new Date(booking.dateTime);
      return bookingDate >= firstDayOfMonth && bookingDate <= currentDate;
    });
  
    this.bookingsThisMonth = bookingsThisMonth.length;
  }

  private calculateUniqueClientEmails(): void {
    const uniqueEmailSet = new Set<string>();

    if (this.bookings && this.bookings.length > 0) {
      this.bookings.forEach((booking) => {
        if (booking.clientEmail) {
          uniqueEmailSet.add(booking.clientEmail);
        }
      });
    }

    this.uniqueClientEmails = uniqueEmailSet.size;
  }

 
  
  
  
  

  private formatDate(date: Date): string {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  }



}

