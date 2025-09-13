import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingProfileComponent } from './coding-profile.component';

describe('CodingProfileComponent', () => {
  let component: CodingProfileComponent;
  let fixture: ComponentFixture<CodingProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodingProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodingProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
