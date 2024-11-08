import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnserPageComponent } from './anser-page.component';

describe('AnserPageComponent', () => {
  let component: AnserPageComponent;
  let fixture: ComponentFixture<AnserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnserPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
