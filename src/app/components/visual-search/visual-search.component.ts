import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visual-search',
  templateUrl: './visual-search.component.html',
})
export class VisualSearchComponent {

  isbuttonPressed: boolean = false;

  onButtonClick() {
    this.isbuttonPressed = !this.isbuttonPressed;
  }

  onKitabeEkleClick() {
   window.open('https://padlet.com/ardaaydin27283/kitabe-y-kleme-iqqllbn9z3jc6rx5', '_blank'); 
  } 
}
