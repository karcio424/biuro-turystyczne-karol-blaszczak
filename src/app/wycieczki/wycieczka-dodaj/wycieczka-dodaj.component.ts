// app/wycieczki/wycieczka-dodaj/wycieczka-dodaj.component.html
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wycieczka-dodaj',
  templateUrl: './wycieczka-dodaj.component.html',
  styleUrls: ['./wycieczka-dodaj.component.css'],
})
export class WycieczkaDodajComponent {
  @Output() dodajWycieczke = new EventEmitter<any>();

  wycieczkaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.wycieczkaForm = this.fb.group({
      nazwa: ['', Validators.required],
      kraj: ['', Validators.required],
      dataRozpoczecia: ['', Validators.required],
      dataZakonczenia: ['', Validators.required],
      cenaJednostkowa: ['', Validators.required],
      maxIloscMiejsc: ['', Validators.required],
      opis: ['', Validators.required],
      zdjecie: ['', Validators.required]
    });
  }

  onSubmit(): void {
    // Logika obsługi przycisku "Dodaj"
    this.dodajWycieczke.emit(this.wycieczkaForm.value);
    // Opcjonalnie: zresetowanie formularza
    this.wycieczkaForm.reset();
  }
}