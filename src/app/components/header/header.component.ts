import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../services/config.service';

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
    'Software Development Engineer',
    'Spring Boot & Java Developer',
    'GenAI & RAG Engineer',
    'Full Stack Developer',
    'Problem Solver'
  ];
  private currentTextIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private typingInterval: any;
  private resumeUrl = '';

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.startTypingAnimation();
    this.configService.getConfig().subscribe(config => {
      if (config && config.resumeUrl) {
        this.resumeUrl = config.resumeUrl;
      }
    });
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
    link.href = this.resumeUrl;
    link.download = 'Vikrant_Chauhan_Resume.pdf';
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
