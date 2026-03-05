import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Skill } from '../../services/portfolio.service';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  allSkills: Skill[] = [];

  skillCategories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Programming', 'Cloud'];
  selectedCategory = 'All';
  hoveredSkill: Skill | null = null;

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe(data => {
      this.allSkills = data.skills;
    });
  }

  getFilteredSkills(): Skill[] {
    if (this.selectedCategory === 'All') {
      return this.allSkills;
    }
    return this.allSkills.filter(skill => skill.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  getProficiencyColor(proficiency: number): string {
    if (proficiency >= 90) return 'text-green-400';
    if (proficiency >= 80) return 'text-blue-400';
    if (proficiency >= 70) return 'text-yellow-400';
    return 'text-orange-400';
  }

  getProficiencyLevel(proficiency: number): string {
    if (proficiency >= 90) return 'Expert';
    if (proficiency >= 80) return 'Advanced';
    if (proficiency >= 70) return 'Intermediate';
    return 'Beginner';
  }


}
