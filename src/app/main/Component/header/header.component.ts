import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  sticky = false;

  @HostListener('window:scroll', ['$event'])
  handleScroll(event: Event): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.sticky = scrollPosition > 100; // Adjust the threshold as needed
  }

}
