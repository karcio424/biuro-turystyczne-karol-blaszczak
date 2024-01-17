import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WycieczkaFiltrComponent } from './wycieczka-filtr.component';

describe('WycieczkaFiltrComponent', () => {
  let component: WycieczkaFiltrComponent;
  let fixture: ComponentFixture<WycieczkaFiltrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WycieczkaFiltrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WycieczkaFiltrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
