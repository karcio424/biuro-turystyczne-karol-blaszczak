import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WycieczkaOcenaComponent } from './wycieczka-ocena.component';

describe('WycieczkaOcenaComponent', () => {
  let component: WycieczkaOcenaComponent;
  let fixture: ComponentFixture<WycieczkaOcenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WycieczkaOcenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WycieczkaOcenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
