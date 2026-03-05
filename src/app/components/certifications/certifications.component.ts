import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Certification } from '../../services/portfolio.service';


@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent implements OnInit {
  showCertModal = false;
  selectedCert: Certification | null = null;
  certifications: Certification[] = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe(data => {
      this.certifications = data.certifications;
    });
  }

  openCertModal(cert: Certification): void {
    this.selectedCert = cert;
    this.showCertModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeCertModal(): void {
    this.showCertModal = false;
    this.selectedCert = null;
    document.body.style.overflow = 'auto';
  }

  openVerificationUrl(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
