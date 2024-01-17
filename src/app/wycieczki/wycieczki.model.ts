// app/wycieczki/wycieczki.model.ts
export interface Wycieczka {
  id: number;
  nazwa: string;
  kraj: string;
  dataRozpoczecia: string;
  dataZakonczenia: string;
  cenaJednostkowa: number;
  maxIloscMiejsc: number;
  opis: string;
  zdjecie: string;
  dostepneMiejsca: number;
  cenaWaluta: string;
  ocena: number | null; // Dodaj pole ocena
}
  