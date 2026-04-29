import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  /*copyToClipboard(element: HTMLElement){

  }*/
  async copyToClipboard(element: HTMLElement) {
    const text = element.innerText.trim();

    try {
      await navigator.clipboard.writeText(text);
      console.log("Copié :", text);
    } catch (err) {
      console.error("Erreur de copie", err);
    }
  }

}
