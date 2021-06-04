// import { HttpClientModule } from '@angular/common/http';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';

// import { StatusUpdateRoutingLinesComponent } from './status-update-routing-lines.component';

// describe('StatusUpdateRoutingLinesComponent', () => {
//   let component: StatusUpdateRoutingLinesComponent;
//   let service : TrackOrderService;
//   let fixture: ComponentFixture<StatusUpdateRoutingLinesComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports:[HttpClientModule],
//       providers:[TrackOrderService],
//       declarations: [ StatusUpdateRoutingLinesComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(StatusUpdateRoutingLinesComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     service = TestBed.inject(TrackOrderService);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call ngAfterViewInit Function',() =>{
//     expect(component.ngAfterViewInit).toBeTruthy();
//   });

//   it('should call tableDrop Function', () =>{
//     expect(component.tableDrop).toBeTruthy();
//   });

//   it('service call validity', () =>{
//     expect(service).toBeTruthy();
//   })
// });
