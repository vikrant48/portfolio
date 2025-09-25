import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  svgPath: string;
  category: string;
  proficiency: number; // 1-100
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  // All skills with enhanced data
  allSkills: Skill[] = [
    { name: 'JavaScript', svgPath: 'assets/icons/skills/Javascript.svg', category: 'Frontend', proficiency: 90, description: 'Modern ES6+ JavaScript for dynamic web applications' },
    { name: 'TypeScript', svgPath: 'assets/icons/skills/Typescript.svg', category: 'Frontend', proficiency: 85, description: 'Type-safe JavaScript for scalable applications' },
    { name: 'React', svgPath: 'assets/icons/skills/React.svg', category: 'Frontend', proficiency: 88, description: 'Component-based UI library for interactive interfaces' },
    { name: 'Angular', svgPath: 'assets/icons/skills/angularjs.svg', category: 'Frontend', proficiency: 82, description: 'Full-featured framework for enterprise applications' },
    { name: 'Tailwind CSS', svgPath: 'assets/icons/skills/tailwind-css.svg', category: 'Frontend', proficiency: 90, description: 'Utility-first CSS framework for rapid UI development' },
    { name: 'Node.js', svgPath: 'assets/icons/skills/Nodedotjs.svg', category: 'Backend', proficiency: 85, description: 'Server-side JavaScript runtime environment' },
    { name: 'Express.js', svgPath: 'assets/icons/skills/express.svg', category: 'Backend', proficiency: 88, description: 'Fast and minimalist web framework for Node.js' },
    { name: 'MongoDB', svgPath: 'assets/icons/skills/mongodb.svg', category: 'Database', proficiency: 80, description: 'NoSQL document database for flexible data storage' },
    { name: 'MySQL', svgPath: 'assets/icons/skills/mysql.svg', category: 'Database', proficiency: 75, description: 'Relational database management system' },
    { name: 'Redis', svgPath: 'assets/icons/skills/redis.svg', category: 'Database', proficiency: 70, description: 'In-memory data structure store for caching' },
    { name: 'Java', svgPath: 'assets/icons/skills/java.svg', category: 'Backend', proficiency: 78, description: 'Object-oriented programming language for enterprise solutions' },
    { name: 'Spring Boot', svgPath: 'assets/icons/skills/spring-boot.svg', category: 'Backend', proficiency: 75, description: 'Java framework for building microservices' },
    { name: 'GitHub', svgPath: 'assets/icons/skills/github.svg', category: 'Tools', proficiency: 90, description: 'Version control and collaborative development platform' },
    { name: 'Docker', svgPath: 'assets/icons/skills/docker.svg', category: 'DevOps', proficiency: 72, description: 'Containerization platform for application deployment' },
    { name: 'Postman', svgPath: 'assets/icons/skills/postman.svg', category: 'Tools', proficiency: 85, description: 'API development and testing tool' },
    { name: 'VS Code', svgPath: 'assets/icons/skills/vs-code.svg', category: 'Tools', proficiency: 95, description: 'Powerful code editor with extensive extensions' },
    { name: 'C++', svgPath: 'assets/icons/skills/cpp3.svg', category: 'Programming', proficiency: 80, description: 'High-performance programming language for system development' },
    { name: 'Cloudinary', svgPath: 'assets/icons/skills/Cloudinary.svg', category: 'Cloud', proficiency: 75, description: 'Cloud-based image and video management service' },
    { name: 'Vercel', svgPath: 'assets/icons/skills/vercel.svg', category: 'Cloud', proficiency: 80, description: 'Frontend deployment platform with global CDN' }
  ];

  skillCategories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Programming', 'Cloud'];
  selectedCategory = 'All';
  hoveredSkill: Skill | null = null;

  constructor() {
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
