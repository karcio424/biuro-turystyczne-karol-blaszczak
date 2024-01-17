import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrWycieczekComponent } from './filtr-wycieczek.component';

describe('FiltrWycieczekComponent', () => {
  let component: FiltrWycieczekComponent;
  let fixture: ComponentFixture<FiltrWycieczekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrWycieczekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltrWycieczekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
