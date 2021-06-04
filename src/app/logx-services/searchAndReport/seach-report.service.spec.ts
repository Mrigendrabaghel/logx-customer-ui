import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
//import { configureTestSuite } from 
import { from } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { SeachReportService } from './seach-report.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SeachReportService',()=>{
    let service: SeachReportService;
    let httpClient : HttpClient;
    let httpTestingController : HttpTestingController;

    //let HttpSpy : any;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientModule,HttpClientTestingModule],
            providers:[SeachReportService]
        });
        httpClient= TestBed.get(HttpClient);

        //this.httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(SeachReportService);

        //this.listTestData = SeachReportMock

        service=TestBed.inject(SeachReportService);
        //service=TestBed.get(SeachReportService);
    });

    it('should be created',()=>{
        expect(service).toBeTruthy();
    });

    // it('SearchReportService GetRecentSearch() method call',()=>{
    //     expect(service.GetRecentSearch).toBeTruthy();
    // });

    // it('SearchReportService AddRecentSearch() method call',()=>{
    //     expect(service.AddRecentSearch).toBeTruthy();
    // });

    it('SearchReportService GetOrderList() method call',()=>{
        expect(service.GetOrderList).toBeTruthy();
    });

    it('SearchReportService GetSearchOrder() method call',()=>{
        expect(service.GetSearchOrder).toBeTruthy();
    });

    it('SearchReportService GetAnnouncement() method call',()=>{
        expect(service.GetAnnouncement).toBeTruthy();
    });

});