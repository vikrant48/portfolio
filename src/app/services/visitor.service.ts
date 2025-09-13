import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface VisitorStats {
  totalVisits: number;
  uniqueVisitors: number;
  lastVisit: string;
}

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private visitorCountSubject = new BehaviorSubject<number>(0);
  public visitorCount$ = this.visitorCountSubject.asObservable();
  
  private readonly VISITOR_KEY = 'portfolio_visitor_count';
  private readonly UNIQUE_VISITOR_KEY = 'portfolio_unique_visitor';
  private readonly API_ENDPOINT = 'https://api.countapi.xyz/hit/vikram-portfolio';
  
  constructor() {
    this.initializeVisitorTracking();
  }

  private async initializeVisitorTracking(): Promise<void> {
    try {
      // Check if running in production (Vercel)
      if (this.isProduction()) {
        await this.trackVisitorProduction();
      } else {
        this.trackVisitorLocal();
      }
    } catch (error) {
      console.warn('Visitor tracking failed, falling back to local storage:', error);
      this.trackVisitorLocal();
    }
  }

  private isProduction(): boolean {
    return window.location.hostname !== 'localhost' && 
           window.location.hostname !== '127.0.0.1' &&
           !window.location.hostname.includes('192.168');
  }

  private async trackVisitorProduction(): Promise<void> {
    try {
      // Use CountAPI for production visitor tracking
      const response = await fetch(`${this.API_ENDPOINT}/visits`);
      const data = await response.json();
      
      if (data && data.value) {
        this.visitorCountSubject.next(data.value);
        this.saveToLocalStorage(data.value);
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      // Fallback to local storage if API fails
      this.trackVisitorLocal();
    }
  }

  private trackVisitorLocal(): void {
    const currentCount = this.getLocalVisitorCount();
    const newCount = currentCount + 1;
    
    this.saveToLocalStorage(newCount);
    this.visitorCountSubject.next(newCount);
    
    // Track unique visitors
    this.trackUniqueVisitor();
  }

  private getLocalVisitorCount(): number {
    const stored = localStorage.getItem(this.VISITOR_KEY);
    return stored ? parseInt(stored, 10) : 0;
  }

  private saveToLocalStorage(count: number): void {
    localStorage.setItem(this.VISITOR_KEY, count.toString());
    localStorage.setItem('portfolio_last_visit', new Date().toISOString());
  }

  private trackUniqueVisitor(): void {
    const uniqueVisitorId = this.getOrCreateUniqueId();
    const visitedBefore = localStorage.getItem(`${this.UNIQUE_VISITOR_KEY}_${uniqueVisitorId}`);
    
    if (!visitedBefore) {
      localStorage.setItem(`${this.UNIQUE_VISITOR_KEY}_${uniqueVisitorId}`, 'true');
      const uniqueCount = this.getUniqueVisitorCount() + 1;
      localStorage.setItem('portfolio_unique_count', uniqueCount.toString());
    }
  }

  private getOrCreateUniqueId(): string {
    let uniqueId = localStorage.getItem('portfolio_visitor_id');
    if (!uniqueId) {
      uniqueId = this.generateUniqueId();
      localStorage.setItem('portfolio_visitor_id', uniqueId);
    }
    return uniqueId;
  }

  private generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getUniqueVisitorCount(): number {
    const stored = localStorage.getItem('portfolio_unique_count');
    return stored ? parseInt(stored, 10) : 0;
  }

  public getVisitorStats(): VisitorStats {
    return {
      totalVisits: this.getLocalVisitorCount(),
      uniqueVisitors: this.getUniqueVisitorCount(),
      lastVisit: localStorage.getItem('portfolio_last_visit') || new Date().toISOString()
    };
  }

  public getCurrentCount(): Observable<number> {
    return this.visitorCount$;
  }

  public resetCount(): void {
    localStorage.removeItem(this.VISITOR_KEY);
    localStorage.removeItem('portfolio_unique_count');
    localStorage.removeItem('portfolio_last_visit');
    this.visitorCountSubject.next(0);
  }
}