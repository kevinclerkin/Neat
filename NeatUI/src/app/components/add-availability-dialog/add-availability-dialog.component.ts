import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-availability-dialog',
  templateUrl: './add-availability-dialog.component.html',
  styleUrls: ['./add-availability-dialog.component.css'],
  styles: [`
  .mat-dialog-content {
    background-color: white;
  }
`]
})
export class AddAvailabilityDialogComponent {
  addAvailabilityForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddAvailabilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.addAvailabilityForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.addAvailabilityForm.valid) {
      const date = this.addAvailabilityForm.get('date')?.value;
      const time = this.addAvailabilityForm.get('time')?.value;

      if (date && time) {
        
        const isoDateTime = `${date}T${time}:00`;

        
        this.dialogRef.close({ dateTime: isoDateTime });
      } else {
        console.error('Invalid date or time values');
      }
    }
  }
}