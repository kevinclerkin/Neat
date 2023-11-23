import { Component, signal, ChangeDetectorRef } from '@angular/core';
import {CalendarOptions, EventInput, DateSelectArg, EventClickArg, EventApi, } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import { Booking, EventData } from 'src/app/Booking';
import { BookingService } from 'src/app/services/booking.service';
import {ChipModule} from 'primeng/chip';
import {Droppable} from 'primeng/dragdrop';
import { Availability } from 'src/app/Availability';
import { AvailabilityService } from 'src/app/services/availability.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    height: 'auto',
    contentHeight: 'auto',
    themeSystem: 'bootstrap5',
    slotDuration: '00:30:00',
    droppable: true,
    //drop: this.handleExternalEventDrop.bind(this),
    //dateClick: this.handleDateClick.bind(this),
    slotMinTime: '08:00:00',
    slotMaxTime: '19:00:00',
    dayHeaders: true,
    firstDay: 1,
    weekends: true,
    lazyFetching: true,
    selectable: true,
    editable: true,
    allDaySlot: true,
    nowIndicator: true,
    expandRows: false,
    slotEventOverlap: true,
    eventMaxStack: 4,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    plugins: [timeGridPlugin, interactionPlugin, bootstrap5Plugin],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    },
    
    events: [
      {
        
      }
    ],

    
    
    eventSources:[{
      url: 'https://localhost:7193/api/Availability', // use the `url` property
      method: 'GET',
      
      color: 'purple',    // an option!
      textColor: 'white'  // an option!
    }]

    

    };

    bookings: Booking[] = [];

    constructor(private changeDetector: ChangeDetectorRef, private bookingService: BookingService, 
      private availabilityService: AvailabilityService) {
    }

    ngOnInit() {
      this.fetchAvailabilityFromAPI();
      this.fetchEventsFromAPI();
      this.initExternalEvents();
      
    }

    fetchEventsFromAPI() {
      this.bookingService.getBookings().subscribe(bookings => {
        const formattedBookings: EventInput[] = bookings.map(booking => ({
          title: String(booking.id),
          start: booking.dateTime,
          end: this.calculateEndDateTime(new Date(booking.dateTime)),
          extendedProps:{
            teamMember: booking.clientEmail
          }
          
        }));
  
        this.calendarOptions.events = formattedBookings;
      });
    }

    fetchAvailabilityFromAPI(){
      this.availabilityService.getAvailabilities().subscribe(availabilities => {
        const formattedAvailabilites: EventInput[] = availabilities.map(availability => ({
          title: String(availability.userId),
          start: availability.dateTime,
          end: this.calculateEndDateTime(new Date(availability.dateTime))
          
          
        }));
  
        this.calendarOptions.events = formattedAvailabilites;
      });
    }

    calculateEndDateTime(start: Date): Date {
      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 30);
      return end;
    }

    externalEvents: EventInput[] = [
      { title: 'David', id: 'teamMember1' },
      { title: 'Alan', id: 'teamMember2' }];

      initExternalEvents() {
        const externalEventsContainer = document.querySelector('.external-events') as HTMLElement;
    
        if (externalEventsContainer) {
          new Draggable(externalEventsContainer, {
            itemSelector: '.external-event',
            eventData: this.handleExternalEventDrop.bind(this),
          });
        }
      }

      handleExternalEventDrop(arg: { dateSelect: DateSelectArg; draggedEl: HTMLElement }) {
        const calendarApi = arg.dateSelect.view;
      
        if (calendarApi) {
          
          const title = arg.draggedEl.innerText.trim();
      
          
          const externalEvent = this.externalEvents.find((event) => event.title === title);
      
          if (externalEvent) {
            
            const newEvent: EventInput = {
              id: this.createEventId(),
              title: externalEvent.title,
              //start,
              allDay: false, 
            };
      
            
            //calendarApi.addEvent(newEvent);
      
            
            const currentEvents = this.currentEvents();
            
            this.currentEvents.set(currentEvents);
            this.changeDetector.detectChanges();
          }
        }
      }
      
  currentEvents = signal<EventApi[]>([]);

  eventPromise!: Promise<EventInput>;


  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      const frontendEvent = {
        //id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr
      };

      calendarApi.addEvent(frontendEvent);

      const backendEvent: Availability = this.mapFrontendToBackend(frontendEvent);

      this.availabilityService.addAvailability(backendEvent).subscribe();

    }
  }

  private mapFrontendToBackend(frontendEvent: any): Availability{
    return {
      userId: frontendEvent.userId,
      dateTime: frontendEvent.start
    }

  }



  handleEventClick(clickInfo: EventClickArg) {
    const title = clickInfo.event.title;
    const teamMember = clickInfo.event.extendedProps['available'];
    if (confirm(`Are you sure you want to delete the event '${title}' with '${teamMember}'`)) {
      const bookingId = clickInfo.event.id;
      const bookingToDelete = this.bookings.find(booking => booking.id === Number(bookingId));
      
      if (bookingToDelete) {
        this.bookingService.deleteBooking(bookingToDelete).subscribe(() => {
          clickInfo.event.remove();
        });
      }
      else {
        clickInfo.event.remove();
      }
  }}

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for expressionChangedAfterItHasBeenCheckedError
  }

  eventGuid = 0;

  createEventId() {
    return String(this.eventGuid++);
  }

  

  
  

}
