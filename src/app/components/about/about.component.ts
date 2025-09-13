import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  svgPath: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('skillsCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  // All skills in a single array for circular animation
  allSkills: Skill[] = [
    { svgPath: 'assets/icons/skills/Javascript.svg' },
    { svgPath: 'assets/icons/skills/Typescript.svg' },
    { svgPath: 'assets/icons/skills/React.svg' },
    { svgPath: 'assets/icons/skills/angularjs.svg' },
    { svgPath: 'assets/icons/skills/tailwind-css.svg' },
    { svgPath: 'assets/icons/skills/Nodedotjs.svg' },
    { svgPath: 'assets/icons/skills/express.svg' },
    { svgPath: 'assets/icons/skills/mongodb.svg' },
    { svgPath: 'assets/icons/skills/mysql.svg' },
    { svgPath: 'assets/icons/skills/redis.svg' },
    { svgPath: 'assets/icons/skills/java.svg' },
    { svgPath: 'assets/icons/skills/spring-boot.svg' },
    { svgPath: 'assets/icons/skills/github.svg' },
    { svgPath: 'assets/icons/skills/docker.svg' },
    { svgPath: 'assets/icons/skills/postman.svg' },
    { svgPath: 'assets/icons/skills/vs-code.svg' },
    { svgPath: 'assets/icons/skills/cpp3.svg' },
    { svgPath: 'assets/icons/skills/Cloudinary.svg' },
    { svgPath: 'assets/icons/skills/vercel.svg' }
  ];

  constructor() {
  }

  ngAfterViewInit() {
    this.drawSkillsCircle();
    this.setupCanvasInteraction();
  }

  private setupCanvasInteraction() {
    const canvas = this.canvasRef.nativeElement;
    
    canvas.addEventListener('mousemove', (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) * (canvas.width / rect.width);
      const y = (event.clientY - rect.top) * (canvas.height / rect.height);
      
      let isHovering = false;
      this.clickableAreas.forEach((area, index) => {
        if (x >= area.x && x <= area.x + area.width && 
            y >= area.y && y <= area.y + area.height) {
          canvas.style.cursor = 'pointer';
          canvas.title = area.skill.name;
          isHovering = true;
        }
      });
      
      if (!isHovering) {
        canvas.style.cursor = 'default';
        canvas.title = 'Skills Visualization';
      }
    });
    
    canvas.addEventListener('click', (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) * (canvas.width / rect.width);
      const y = (event.clientY - rect.top) * (canvas.height / rect.height);
      
      this.clickableAreas.forEach((area) => {
        if (x >= area.x && x <= area.x + area.width && 
            y >= area.y && y <= area.y + area.height) {
          console.log('Clicked skill:', area.skill.svgPath);
          // You can add more interaction logic here
        }
      });
    });
  }

  private async drawSkillsCircle() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 140;
    const iconSize = 50;

    // Clear canvas with transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw skills in a circle
    const drawPromises = this.allSkills.map(async (skill, index) => {
      const angle = (index * 2 * Math.PI) / this.allSkills.length - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // Create clickable area
      const clickableArea = {
        x: x - iconSize / 2,
        y: y - iconSize / 2,
        width: iconSize,
        height: iconSize,
        skill: skill
      };

      // Draw skill icon background with gradient
      const gradient = ctx.createLinearGradient(x - iconSize/2, y - iconSize/2, x + iconSize/2, y + iconSize/2);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#1d4ed8');
      
      ctx.beginPath();
      ctx.arc(x, y, iconSize / 2, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add shadow effect
      ctx.shadowColor = 'rgba(59, 130, 246, 0.4)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
      ctx.fill();
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Load and draw SVG icon
      await this.loadAndDrawSVG(ctx, skill.svgPath, x, y, 30);

      // Store clickable areas for potential interaction
      if (!this.clickableAreas) {
        this.clickableAreas = [];
      }
      this.clickableAreas[index] = clickableArea;
    });

    // Wait for all SVGs to load
    await Promise.all(drawPromises);
  }

  private clickableAreas: any[] = [];

  private async loadAndDrawSVG(ctx: CanvasRenderingContext2D, svgPath: string, x: number, y: number, size: number): Promise<void> {
    try {
      const response = await fetch(svgPath);
      const svgText = await response.text();
      
      // Create an image from SVG
      const img = new Image();
      const svgBlob = new Blob([svgText], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        // Draw the SVG image centered
        ctx.drawImage(img, x - size/2, y - size/2, size, size);
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
    } catch (error) {
      console.error('Error loading SVG:', error);
      // Fallback: draw a simple circle
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  private animateCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rotation = 0;
    const animate = () => {
      rotation += 0.01;
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotation);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      
      this.drawSkillsCircle();
      
      ctx.restore();
      requestAnimationFrame(animate);
    };
    
    // Uncomment to enable rotation animation
    // animate();
  }
}
