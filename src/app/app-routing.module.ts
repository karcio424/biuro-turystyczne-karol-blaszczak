// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WycieczkiComponent } from './wycieczki/wycieczki.component'; // Zakładam, że masz taki komponent

const routes: Routes = [
  { path: '', component: WycieczkiComponent },
  // Dodaj inne ścieżki dla innych widoków, jeśli potrzebujesz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
