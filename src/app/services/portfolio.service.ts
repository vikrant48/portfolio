import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

export interface Skill {
    name: string;
    svgPath: string;
    category: string;
    proficiency: number;
    description: string;
}

export interface Certification {
    id: number;
    title: string;
    issuer: string;
    date: string;
    credentialId?: string;
    verificationUrl?: string;
    description: string;
    skills: string[];
    badgeUrl?: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    liveUrl: string;
    githubUrl: string;
    iconType: string; // 'video', 'heart', 'news', 'graph'
    gradientClass: string;
    hoverBorderClass: string;
    hoverTitleClass: string;
}

export interface Education {
    id: number;
    title: string;
    subtitle: string;
    institution: string;
    period: string;
    percentage?: string;
    achievements: string[];
    dotColor: string;
}

export interface PortfolioData {
    skills: Skill[];
    certifications: Certification[];
    projects: Project[];
    education: Education[];
}

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {
    private apiUrl = 'https://portfolio-server-ten-psi.vercel.app/api/portfolio-data';
    private data$: Observable<PortfolioData> | null = null;

    constructor(private http: HttpClient) { }

    getPortfolioData(): Observable<PortfolioData> {
        if (!this.data$) {
            this.data$ = this.http.get<PortfolioData>(this.apiUrl).pipe(
                shareReplay(1)
            );
        }
        return this.data$;
    }
}
