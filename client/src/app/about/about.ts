import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  @ViewChild('featuresSection') featuresSection!: ElementRef;

  contact = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  scrollToFeatures() {
    if (this.featuresSection) {
      this.featuresSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onSubmit() {
    // Handle form submission
    console.log('Contact form submitted:', this.contact);
    // Here you would typically send the data to your backend
    alert('Thank you for your message! We\'ll get back to you soon.');
    this.contact = { name: '', email: '', subject: '', message: '' };
  }
}
