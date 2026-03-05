import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

export interface AppConfig {
    resumeUrl: string;
}

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private apiUrl = 'https://portfolio-server-ten-psi.vercel.app/api/config';
    private config$?: Observable<AppConfig>;

    constructor(private http: HttpClient) { }

    getConfig(): Observable<AppConfig> {
        if (!this.config$) {
            this.config$ = this.http.get<AppConfig>(this.apiUrl).pipe(
                shareReplay(1)
            );
        }
        return this.config$;
    }
}
