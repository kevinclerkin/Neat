import { Component } from '@angular/core';
import {CalendarOptions} from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    }
    
    

  };

}
