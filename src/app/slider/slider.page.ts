import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles


@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-container', {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  quit() {
    console.log('Quit');
    this.navCtrl.navigateRoot('/tabs');
  }

}
