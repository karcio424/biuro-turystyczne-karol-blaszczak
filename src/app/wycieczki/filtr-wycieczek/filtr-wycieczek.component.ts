// // app/wycieczki/filtr-wycieczek/filtr-wycieczek.component.ts
// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-filtr-wycieczek',
//   templateUrl: './filtr-wycieczek.component.html',
//   styleUrls: ['./filtr-wycieczek.component.css'],
// })
// export class FiltrWycieczekComponent implements OnInit {
//   @Output() filtrChanged = new EventEmitter<any>();

//   filtrForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.filtrForm = this.fb.group({
//       lokalizacja: [''],
//       minCena: [''],
//       maxCena: [''],
//       startDate: [''],
//       endDate: [''],
//       oceny: [[]],
//     });
//   }

//   ngOnInit(): void {
//     // Dodaj logikę inicjalizacji formularza, jeśli potrzebne
//   }

//   applyFilter(): void {
//     const filtrData = this.filtrForm.value;
//     this.filtrChanged.emit(filtrData);
//   }
// }
// app/wycieczki/filtr-wycieczek/filtr-wycieczek.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterService } from './filtr-wycieczek.service'; // Importuj serwis filtrów

@Component({
  selector: 'app-filtr-wycieczek',
  templateUrl: './filtr-wycieczek.component.html',
  styleUrls: ['./filtr-wycieczek.component.css'],
})
export class FiltrWycieczekComponent implements OnInit {
  @Output() filtrChanged = new EventEmitter<any>();

  filtrForm: FormGroup;

  constructor(private fb: FormBuilder, private filterService: FilterService) {
    this.filtrForm = this.fb.group({
      lokalizacja: [''],
      minCena: [''],
      maxCena: [''],
      startDate: [''],
      endDate: [''],
      oceny: [[]],
    });
  }

  ngOnInit(): void {
    // Inicjalizacja formularza, jeśli potrzebne
  }

  applyFilter(): void {
    const filtrData = this.filtrForm.value;
    this.filterService.setFilters(filtrData);
  }
}
