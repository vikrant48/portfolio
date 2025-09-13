import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  publicGists: number;
  createdAt: string;
}

@Component({
  selector: 'app-coding-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './coding-profile.component.html',
  styleUrl: './coding-profile.component.css'
})
export class CodingProfileComponent implements OnInit {
  leetcodeStats: LeetCodeStats = {
    totalSolved: 0,
    totalQuestions: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    acceptanceRate: 0,
    ranking: 0,
    contributionPoints: 0,
    reputation: 0
  };

  githubStats: GitHubStats = {
    publicRepos: 0,
    followers: 0,
    following: 0,
    publicGists: 0,
    createdAt: ''
  };

  leetcodeProgress: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadLeetCodeStats();
    this.loadGitHubStats();
  }

  private loadLeetCodeStats(): void {
    const url = `https://leetcode-stats-api.herokuapp.com/vikrantlee`;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        if (data.status === 'success') {
          this.leetcodeStats = {
            totalSolved: data.totalSolved || 0,
            totalQuestions: data.totalQuestions || 0,
            easySolved: data.easySolved || 0,
            mediumSolved: data.mediumSolved || 0,
            hardSolved: data.hardSolved || 0,
            acceptanceRate: data.acceptanceRate || 0,
            ranking: data.ranking || 0,
            contributionPoints: data.contributionPoints || 0,
            reputation: data.reputation || 0
          };

          this.leetcodeProgress = this.leetcodeStats.totalQuestions > 0
            ? (this.leetcodeStats.totalSolved / this.leetcodeStats.totalQuestions) * 100
            : 0;
        } else {
          console.warn('LeetCode API returned non-success status:', data.message);
          this.setFallbackLeetCodeStats();
        }
      },
      error: (err) => {
        console.error('Error fetching LeetCode stats:', err);
        this.setFallbackLeetCodeStats();
      }
    });
  }

  private setFallbackLeetCodeStats(): void {
    // Fallback data in case API is unavailable
    this.leetcodeStats = {
      totalSolved: 150,
      totalQuestions: 2500,
      easySolved: 75,
      mediumSolved: 60,
      hardSolved: 15,
      acceptanceRate: 85,
      ranking: 50000,
      contributionPoints: 1200,
      reputation: 850
    };

    this.leetcodeProgress = (this.leetcodeStats.totalSolved / this.leetcodeStats.totalQuestions) * 100;
  }

  private loadGitHubStats(): void {
    this.http.get<any>('https://api.github.com/users/vikrant48').subscribe({
      next: (data) => {
        this.githubStats = {
          publicRepos: data.public_repos,
          followers: data.followers,
          following: data.following,
          publicGists: data.public_gists,
          createdAt: data.created_at
        };
      },
      error: (error) => {
        console.error('Error fetching GitHub stats:', error);
        this.githubStats = {
          publicRepos: 25,
          followers: 10,
          following: 15,
          publicGists: 5,
          createdAt: '2021-01-01T00:00:00Z'
        };
      }
    });
  }

}
