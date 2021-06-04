import { GoogleMap } from '@agm/core/services/google-maps-types';
import { Component, Input, OnInit } from '@angular/core';
import { commonNumbers } from 'src/app/configs/constants';
import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';
import { OrderTransitMap, StopMarker } from 'src/app/shared/models/order/order';

@Component({
  selector: 'app-transit-map',
  templateUrl: './transit-map.component.html',
  styleUrls: ['./transit-map.component.scss']
})
export class TransitMapComponent implements OnInit {
  commonNumbers = commonNumbers;
  @Input() start: number[];
  @Input() end: number[];
  start_end_mark = [];
  originLatLng: any = [];
  destLatLng: any = [];
  previous;
  showData: string;
  showvalue:string;
  @Input() orderNum: string = '';
  orderTransitMap: OrderTransitMap;
  stopMarker: StopMarker[] = [];
  mapValue: any;
  zoom: number = 1;
  lat: Number = undefined;
  long: Number = undefined;
  @Input() label: string | google.maps.MarkerLabel;
  map: google.maps.Map;
  ds: google.maps.DirectionsService;
  dr: google.maps.DirectionsRenderer;
  origin = {}
  destination = {}
  constructor(private trackOrderService: TrackOrderService) {
  }

  ngOnInit(): void {

    this.showTransitMapDetails();
    //window.addEventListener('resize', () => Map.getViewPort().resize());
  }
  worldRestriction = {
    latLngBounds: {
      east: -179.222114,
      north: 84.382684,
      south: -83.568808,
      west: -178.321196
    },
    strictBounds: true
  };
  
  showTransitMapDetails() {
    try {
      this.trackOrderService.getOrderTransitMapItems(this.orderNum).subscribe(data => {
        if (data[0].jsonResponse!=="") {
          this.orderTransitMap = data
          this.mapValue = JSON.parse(this.orderTransitMap[0].jsonResponse).TransitDetails[0];
          for (var item of this.mapValue.Stops) {
            let slat = item.STOP.STOPLATITUDE;
            let slng = item.STOP.STOPLONGITUDE;
            this.stopMarker.push({ latitude: slat, longitude: slng , label:""});
          }
          this.stopMarker.push({ latitude: this.mapValue.ORIGINLATITUDE, longitude: this.mapValue.ORIGINLONGITUDE, label:"A" })
          this.origin = { lat: this.mapValue.ORIGINLATITUDE, lng: this.mapValue.ORIGINLONGITUDE};
          this.stopMarker.push({ latitude: this.mapValue.DESTINATIONLATITUDE, longitude: this.mapValue.DESTINATIONLONGITUDE, label:"B" })
          this.destination = { lat: this.mapValue.DESTINATIONLATITUDE, lng: this.mapValue.DESTINATIONLONGITUDE};
        }
      })
    }
    catch(error) {
      throw error
    }
  }
  public renderOptions = {
    suppressMarkers: true,
}
  clickedMarker(infowindow) {
    try {
      if (this.previous) {
        this.previous.close();
      }
      if (infowindow.hostMarker.latitude == this.mapValue.ORIGINLATITUDE && infowindow.hostMarker.longitude == this.mapValue.ORIGINLONGITUDE) {
        this.showData = '';
        this.showData = this.mapValue.ORIGINADDRESNAME + " " + this.mapValue.ORIGINADDR1 + " " + this.mapValue.ORIGINCITY
          + " " + this.mapValue.ORIGINSTATENAME + " , " + this.mapValue.ORIGINPOSTALCODE
      }
      if (infowindow.hostMarker.latitude == this.mapValue.DESTINATIONLATITUDE && infowindow.hostMarker.longitude == this.mapValue.DESTINATIONLONGITUDE) {
        this.showData = '';
        this.showData = this.mapValue.DESTINATIONADDRESNAME + " " + this.mapValue.DESTINATIONADDR1 + " " + this.mapValue.DESTINATIONCITY
          + " " + this.mapValue.DESTINATIONSTATENAME + " , " + this.mapValue.DESTINATIONPOSTALCODE
      }
      this.previous = infowindow;   
    }
    catch (error) {
      throw error
    }
  }


  // dir =undefined;
  // public getDirection() {
  //   this.dir = {
  //     origin: { lat: this.mapValue.ORIGINLATITUDE, lng: this.mapValue.ORIGINLONGITUDE },
  //     destination: { lat:this.mapValue.DESTINATIONLATITUDE, lng: this.mapValue.ORIGINLATITUDE }
  //   }
  // }


}
