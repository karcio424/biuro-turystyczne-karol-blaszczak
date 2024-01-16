import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WycieczkaDodajComponent } from './wycieczka-dodaj.component';

describe('WycieczkaDodajComponent', () => {
  let component: WycieczkaDodajComponent;
  let fixture: ComponentFixture<WycieczkaDodajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WycieczkaDodajComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WycieczkaDodajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
