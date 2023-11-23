import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Availability } from 'src/app/Availability';
import { AvailabilityService } from 'src/app/services/availability.service';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {
  availabilityForm!: FormGroup;
  availabilities!: Availability[];

  constructor(
    private formBuilder: FormBuilder,
    private availabilityService: AvailabilityService
  ) {}

  ngOnInit(): void {
    this.availabilityForm = this.formBuilder.group({
      selectedAvailability: new FormControl(null),
    });

    this.availabilityService.getAvailabilities().subscribe((availabilities) => {
      this.availabilities = availabilities;
    });
  }
}