import { HttpClientModule, HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OrderModel } from 'src/app/shared/models/order/order';
import { TrackOrderService } from './track-order.service';

const OK_STATUS_CODE = '200';

describe('TrackOrderService', () => {
  let service: TrackOrderService;
  let httpClient : HttpClient;
  let httpTestingController : HttpTestingController;
  let  getResponse;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientModule, HttpClientTestingModule],
        providers:[TrackOrderService]
    });
    service=TestBed.get(TrackOrderService)
    httpClient= TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(TrackOrderService);
   
  });

  describe('#GetshipmentDetails',()=>{
    beforeEach(()=>{
      let getTestData = {
        code : OK_STATUS_CODE,
        data:{
          'deliveryDateTimeUtc':"2018-04-03T13:10:00",
          'deliveryLocation':'SW3117-23511-DLA DISTRIBUTION NORFOLK VIRGINIA',
          'orderID':12345,
          'orderNum':'AY1004SCN16237704',
          'originLocation':'BDCC YU',
          'pickupDateTimeUtc':"2018-04-03T13:10:00",
          'status':'Commited',
          'tcnNumber':12345
          //'searchCriteria' : 'abc'
       },
      };
      getResponse = service.GetshipmentDetails(getTestData[0]);
    });

    it('should return an observable',()=>{
      expect(getResponse).toEqual(jasmine.any(Observable))
    });
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Track order service GetOrder() method call',()=>{
    expect(service.GetOrder).toBeTruthy();
  });

  it('Track order service GetshipmentDetails() method call',()=>{
      expect(service.GetshipmentDetails).toBeTruthy();
  });

  it('Track order service getOrderHeaderDetails() method call',()=>{
    expect(service.getOrderHeaderDetails).toBeTruthy();
  });

  it('Track order service getOrderLineItems() method call',()=>{
    expect(service.getOrderLineItems).toBeTruthy();
  });

  it('Track order service getOrderComments() method call',()=>{
    expect(service.getOrderComments).toBeTruthy();
  });

  it('Track order service getStatusUpdateRoutingLineItems() method call',()=>{
    expect(service.getStatusUpdateRoutingLineItems).toBeTruthy();
  });

  it('Track order service getOrderAttachment() method call',()=>{
    expect(service.getOrderAttachment).toBeTruthy();
  });

});