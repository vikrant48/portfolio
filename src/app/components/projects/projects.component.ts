import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  resumeUrl: SafeResourceUrl;
  showResumeModal = false;

  constructor(private sanitizer: DomSanitizer) {
    // Sanitize the PDF URL for safe embedding
    this.resumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/resume/vikrant__resume.pdf');
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = 'assets/resume/vikrant__resume.pdf';
    link.download = 'Vikrant_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  openResumeModal(): void {
    this.showResumeModal = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeResumeModal(): void {
    this.showResumeModal = false;
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'auto';
  }
 }
