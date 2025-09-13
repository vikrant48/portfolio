import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
  description: string;
  skills: string[];
  imageUrl?: string;
  badgeUrl?: string;
}

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent {
  showCertModal = false;
  selectedCert: Certification | null = null;

  certifications: Certification[] = [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-SAA-2023-001',
      verificationUrl: 'https://aws.amazon.com/verification',
      description: 'Demonstrates expertise in designing distributed systems on AWS platform with focus on scalability, security, and cost optimization.',
      skills: ['AWS', 'Cloud Architecture', 'EC2', 'S3', 'Lambda', 'RDS'],
      badgeUrl: 'https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png'
    },
    {
      id: 2,
      title: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2023',
      credentialId: 'GCP-PD-2023-002',
      verificationUrl: 'https://cloud.google.com/certification/verify',
      description: 'Validates ability to design, build, and deploy applications on Google Cloud Platform using best practices.',
      skills: ['Google Cloud', 'Kubernetes', 'App Engine', 'Cloud Functions', 'BigQuery'],
      badgeUrl: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/12345'
    },
    {
      id: 3,
      title: 'Microsoft Azure Fundamentals',
      issuer: 'Microsoft',
      date: '2022',
      credentialId: 'AZ-900-2022-003',
      verificationUrl: 'https://docs.microsoft.com/en-us/learn/certifications/verify',
      description: 'Foundational knowledge of cloud services and how those services are provided with Microsoft Azure.',
      skills: ['Azure', 'Cloud Computing', 'Virtual Machines', 'Storage', 'Networking'],
      badgeUrl: 'https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png'
    },
    {
      id: 4,
      title: 'Certified Kubernetes Administrator',
      issuer: 'Cloud Native Computing Foundation',
      date: '2023',
      credentialId: 'CKA-2023-004',
      verificationUrl: 'https://training.linuxfoundation.org/certification/verify',
      description: 'Demonstrates skills required to be a successful Kubernetes Administrator in industry today.',
      skills: ['Kubernetes', 'Docker', 'Container Orchestration', 'DevOps', 'Linux'],
      badgeUrl: 'https://images.credly.com/size/340x340/images/8b8ed108-e77d-4396-ac59-2504583b9d54/cka_from_cncfsite__281_29.png'
    },
    {
      id: 5,
      title: 'Angular Certified Developer',
      issuer: 'Angular',
      date: '2023',
      credentialId: 'ANG-DEV-2023-005',
      description: 'Comprehensive understanding of Angular framework, TypeScript, and modern web development practices.',
      skills: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Testing', 'PWA'],
      badgeUrl: 'https://angular.io/assets/images/logos/angular/angular.png'
    },
    {
      id: 6,
      title: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: '2022',
      credentialId: 'MDB-DEV-2022-006',
      verificationUrl: 'https://university.mongodb.com/verify_certificate',
      description: 'Proficiency in MongoDB database design, development, and administration.',
      skills: ['MongoDB', 'NoSQL', 'Database Design', 'Aggregation', 'Indexing'],
      badgeUrl: 'https://webimages.mongodb.com/_com_assets/cms/kuzt9r42or1fxvlq2-Meta_Generic.png'
    }
  ];

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
