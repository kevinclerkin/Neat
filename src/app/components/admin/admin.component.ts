import { Component, signal, ChangeDetectorRef } from '@angular/core';
import {CalendarOptions, EventInput, DateSelectArg, EventClickArg, EventApi, } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import { Booking, EventData } from 'src/app/Booking';

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
        id: "a",
        title: "my event",
        start: "2023-11-20T12:30:00",
        end: "2023-11-20T13:30:00"
      }
    ],
    
    eventSources:[]

    };

    currentEvents = signal<EventApi[]>([]);

    constructor(private changeDetector: ChangeDetectorRef) {
    }

  eventPromise!: Promise<EventInput>;

  //handleDateClick(arg: { dateStr: string; }) {
    //alert('date click! ' + arg.dateStr)
  //}

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  eventGuid = 0;

  createEventId() {
    return String(this.eventGuid++);
  }

  

}
