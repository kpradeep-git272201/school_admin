import { AfterViewInit, Component } from '@angular/core';
import { PrimengModule } from '../../../primeng/primeng.module';
declare var $: any;
@Component({
  selector: 'app-landing',
   imports: [PrimengModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 30,
      dots: true,
      nav: false,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1024: { items: 3 },
        1366: { items: 4 }
      }
    });
  }
}


/* 
install
npm install primeng primeicons primeflex
npm install bootstrap jquery owl.carousel 

*/
