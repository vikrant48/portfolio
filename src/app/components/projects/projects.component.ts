import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConfigService } from '../../services/config.service';
import { PortfolioService, Project, Education } from '../../services/portfolio.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  safeResumeUrl: SafeResourceUrl;
  rawResumeUrl: string = 'assets/resume/vikrant_resume_NITK.pdf';
  showResumeModal = false;
  projects: Project[] = [];
  education: Education[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private configService: ConfigService,
    private portfolioService: PortfolioService
  ) {
    // Initial fallback
    this.safeResumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.rawResumeUrl);
  }

  ngOnInit() {
    this.portfolioService.getPortfolioData().subscribe(data => {
      this.projects = data.projects;
      this.education = data.education;
    });

    this.configService.getConfig().subscribe(config => {
      this.rawResumeUrl = config.resumeUrl;

      // Transform Google Drive URL for preview if needed
      let previewUrl = this.rawResumeUrl;
      if (this.rawResumeUrl.includes('drive.google.com')) {
        // If it's a download link, convert it to a preview link for the iframe
        previewUrl = this.rawResumeUrl.replace('/uc?export=download&id=', '/file/d/') + '/preview';
        // Remove export parameter if present differently
        previewUrl = previewUrl.replace('?export=download&', '');
      }

      this.safeResumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(previewUrl);
    });
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = this.rawResumeUrl;
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
