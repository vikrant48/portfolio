import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { VisitorService } from '../../services/visitor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;
  currentYear = new Date().getFullYear();
  visitorCount = 0;
  private visitorSubscription?: Subscription;

  constructor(
    private fb: FormBuilder, 
    private messageService: MessageService,
    private visitorService: VisitorService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    // Subscribe to visitor count updates
    this.visitorSubscription = this.visitorService.getCurrentCount().subscribe(
      count => this.visitorCount = count
    );
  }

  ngOnDestroy(): void {
    if (this.visitorSubscription) {
      this.visitorSubscription.unsubscribe();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitMessage = '';
      
      try {
        const formData = this.contactForm.value;
        const success = await this.messageService.submitMessage({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          message: formData.message
        });
        
        this.isSubmitting = false;
        
        if (success) {
          this.submitSuccess = true;
          this.submitMessage = 'Thank you for your message! It has been sent successfully and saved to my records. I\'ll get back to you soon.';
        } else {
          this.submitSuccess = false;
          this.submitMessage = 'Sorry, there was an error sending your message. Please try again or contact me directly via email.';
        }
        
        if (success) {
          this.contactForm.reset();
        }
        
        // Clear message after 5 seconds
        setTimeout(() => {
          this.submitMessage = '';
          this.submitSuccess = false;
        }, 5000);
        
      } catch (error) {
        this.isSubmitting = false;
        this.submitSuccess = false;
        this.submitMessage = 'Sorry, there was an error sending your message. Please check your connection and try again.';
        
        // Clear error message after 5 seconds
        setTimeout(() => {
          this.submitMessage = '';
        }, 5000);
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }
}
