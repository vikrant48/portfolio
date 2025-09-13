import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  currentTypingText = '';
  private typingTexts = [
    'Full Stack Developer',
    'Java Developer',
    'Backend Developer',
    'Problem Solver',
    'Tech Enthusiast'
  ];
  private currentTextIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private typingInterval: any;

  ngOnInit() {
    this.startTypingAnimation();
  }

  ngOnDestroy() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  downloadResume() {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = 'assets/resume/vikrant__resume.pdf'; // You'll need to add your resume PDF to assets/resume/
    link.download = 'Vikrant_NITK_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private startTypingAnimation() {
    this.typingInterval = setInterval(() => {
      const currentText = this.typingTexts[this.currentTextIndex];
      
      if (!this.isDeleting) {
        // Typing
        this.currentTypingText = currentText.substring(0, this.currentCharIndex + 1);
        this.currentCharIndex++;
        
        if (this.currentCharIndex === currentText.length) {
          // Pause before deleting
          setTimeout(() => {
            this.isDeleting = true;
          }, 2000);
        }
      } else {
        // Deleting
        this.currentTypingText = currentText.substring(0, this.currentCharIndex - 1);
        this.currentCharIndex--;
        
        if (this.currentCharIndex === 0) {
          this.isDeleting = false;
          this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length;
        }
      }
    }, this.isDeleting ? 50 : 100);
  }
}
