import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproperty } from 'src/app/interfaces/Iproperty.interface';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
})
export class PropertyComponent implements OnInit {
  responsiveOptions: any[] = [];
  displayCustom: boolean = false;
  activeIndex: number = 0;
  images: any[] = [];
  imageFirst!: object;
  imagesThree: any[] = [];
  valueChange = [];

  imagePath: string = '../../../assets/images/schematic.svg';
  property!: Iproperty;
  constructor(private _activateRoute: ActivatedRoute) {
    this.responsiveOptions = [
      {
        breakpoint: '1500px',
        numVisible: 1,
      },
      {
        breakpoint: '1024px',
        numVisible: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 1,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];
  }
  ngOnInit() {
    this._activateRoute.data.subscribe({
      next: ({ data }) => {
        this.property = data.data.property;

        this.images = data.data.property.images;
      },
    });
  }

  //window print
  printProperty() {
    window.print();
  }
  //slider
  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }
  handleImageError(e: Event) {
    const target = e.target as HTMLImageElement;
    target.src = this.imagePath;
  }
}
