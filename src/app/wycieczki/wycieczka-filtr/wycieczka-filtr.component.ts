// wycieczka-filtr.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-wycieczka-filtr',
  templateUrl: './wycieczka-filtr.component.html',
  styleUrls: ['./wycieczka-filtr.component.css'],
})
export class WycieczkaFiltrComponent {
  @Output() filtrChanged = new EventEmitter<any>();

  filtrForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filtrForm = this.fb.group({
      lokalizacja: [],
      cenaOd: [],
      cenaDo: [],
      dataOd: [],
      dataDo: [],
      ocena: [],
    });
  }

  applyFiltr() {
    this.filtrChanged.emit(this.filtrForm.value);
  }
}
