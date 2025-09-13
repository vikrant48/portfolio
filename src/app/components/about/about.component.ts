import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  // All skills in a single array for circular animation
  allSkills: Skill[] = [
    { name: 'JavaScript', icon: 'fab fa-js-square' },
    { name: 'TypeScript', icon: 'fab fa-js-square' },
    { name: 'React', icon: 'fab fa-react' },
    { name: 'Angular', icon: 'fab fa-angular' },
    { name: 'Tailwind CSS', icon: 'fab fa-css3-alt' },
    { name: 'Node.js', icon: 'fab fa-node-js' },
    { name: 'Express', icon: 'fas fa-server' },
    { name: 'MongoDB', icon: 'fas fa-leaf' },
    { name: 'MySQL', icon: 'fas fa-database' },
    { name: 'Redis', icon: 'fas fa-database' },
    { name: 'Java', icon: 'fab fa-java' },
    { name: 'Spring Boot', icon: 'fas fa-leaf' },
    { name: 'Git', icon: 'fab fa-git-alt' },
    { name: 'GitHub', icon: 'fab fa-github' },
    { name: 'Docker', icon: 'fab fa-docker' },
    { name: 'Postman', icon: 'fas fa-paper-plane' },
    { name: 'VS Code', icon: 'fas fa-code' },
    { name: 'C++', icon: 'fas fa-code' },
    { name: 'Cloudinary', icon: 'fas fa-cloud' },
    { name: 'Vercel', icon: 'fas fa-rocket' }
  ];
}
