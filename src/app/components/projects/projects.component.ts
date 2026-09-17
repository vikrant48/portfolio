import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConfigService } from '../../services/config.service';
import { PortfolioService, Project, Education, Experience } from '../../services/portfolio.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  safeResumeUrl: SafeResourceUrl = '';
  rawResumeUrl: string = '';
  showResumeModal = false;
  projects: Project[] = [];
  education: Education[] = [];
  experiences: Experience[] = [];

  activeVideoModalProject: Project | null = null;
  videoMutedMap: { [key: number]: boolean } = {};

  constructor(
    private sanitizer: DomSanitizer,
    private configService: ConfigService,
    private portfolioService: PortfolioService
  ) { }

  private getPreviewUrl(url: string): string {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
      let cleanUrl = url.split('?')[0];
      if (cleanUrl.endsWith('/view') || cleanUrl.endsWith('/edit')) {
        cleanUrl = cleanUrl.substring(0, cleanUrl.lastIndexOf('/'));
      }
      if (!cleanUrl.endsWith('/preview')) {
        cleanUrl = cleanUrl + '/preview';
      }
      return cleanUrl;
    }
    return url;
  }

  ngOnInit() {
    this.portfolioService.getPortfolioData().subscribe(data => {
      this.projects = data.projects;
      this.education = data.education;
      this.experiences = data.experience || [
        {
          id: 1,
          role: 'Software Development Engineer -- I',
          company: 'PeopleStrong',
          location: 'Gurugram, India',
          period: 'Nov 2025 -- Present',
          team: 'Recruit & Onboarding Team',
          achievements: [
            'Actively driving backend development for high-volume recruitment workflows as an SDE-1 in the Recruit & Onboarding team following Scrum methodologies.',
            'Conceptualized and deployed scalable backend services using Java and Spring Boot, creating optimized RESTful APIs that reduced request processing time by 20%.',
            'Partnered on Angular frontend integration to support backend-driven features, streamlining the onboarding flow and decreasing page load time by 15%.',
            'Fortified application security by remediating 15+ critical vulnerabilities identified by Snyk (including DoS, RCE, SQL Injection, and XSS).'
          ],
          skills: ['Java', 'Spring Boot', 'Angular', 'Microservices', 'RESTful APIs', 'Snyk Security', 'Scrum']
        }
      ];
      // Initialize video mute status for each project
      if (this.projects) {
        this.projects.forEach(p => {
          this.videoMutedMap[p.id] = true;
        });
      }
    });

    this.configService.getConfig().subscribe(config => {
      if (config && config.resumeUrl) {
        this.rawResumeUrl = config.resumeUrl;
        const previewUrl = this.getPreviewUrl(this.rawResumeUrl);
        this.safeResumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(previewUrl);
      }
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
    document.body.style.overflow = 'hidden';
  }

  closeResumeModal(): void {
    this.showResumeModal = false;
    document.body.style.overflow = 'auto';
  }

  toggleVideoMute(projectId: number, event?: Event): void {
    this.videoMutedMap[projectId] = !this.videoMutedMap[projectId];
    if (event) {
      const target = event.currentTarget as HTMLElement;
      const container = target.closest('.relative');
      const video = container?.querySelector('video') as HTMLVideoElement;
      if (video) {
        video.muted = this.videoMutedMap[projectId];
      }
    }
  }

  toggleVideoPlay(event: Event): void {
    const video = event.currentTarget as HTMLVideoElement;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  }

  openVideoModal(project: Project): void {
    this.activeVideoModalProject = project;
    document.body.style.overflow = 'hidden';
  }

  closeVideoModal(): void {
    this.activeVideoModalProject = null;
    document.body.style.overflow = 'auto';
  }
}
