import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http';
import{ FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateBookingComponent } from './create-booking.component';

describe('CreateBookingComponent', () => {
  let component: CreateBookingComponent;
  let fixture: ComponentFixture<CreateBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBookingComponent],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
