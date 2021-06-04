import { Component, OnInit, ViewChild,Input, Output, EventEmitter,AfterViewInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { StatusUpdateLines} from 'src/app/shared/models/order/order';
import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { MatPaginator } from '@angular/material/paginator';
import { commonNumbers, StatusUpdateRouting } from 'src/app/configs/constants';

@Component({
  selector: 'app-status-update-routing-lines',
  templateUrl: './status-update-routing-lines.component.html',
  styleUrls: ['./status-update-routing-lines.component.scss']
})
export class StatusUpdateRoutingLinesComponent implements OnInit{

  commonNumbers = commonNumbers; 
  statusUpdateCount: EventEmitter<number> = new EventEmitter<number>();
  @Input() statusUpdateLinesData :StatusUpdateLines[]=[];
  StatusUpdateRouting = StatusUpdateRouting;
  displayedColumns: string[] = ['loadNumber','carrier', 'status', 'city', 'notes', 'dateTime'];
  statusUpdatedisplayedColumns: any[] = [];
  Lookuptype: string = 'innergrid-pagecount';
  pageSizeOptions: any[] = [];
  pageSize:number;
  activePageData = []
  statusUpdatedataSource = new MatTableDataSource(this.statusUpdateLinesData);
  len: number;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.statusUpdatedataSource.sort = sort;    
  }
  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.statusUpdatedataSource.paginator = paginator;
     }

  previousIndex: number;

  constructor(private trackOrderService: TrackOrderService,
    public uploadService:UploadAndLookupDetailService) { }

  ngOnInit(): void {  
  }
 
  ngAfterViewInit(){
    this.statusUpdatedataSource = new MatTableDataSource(this.statusUpdateLinesData);    
    this.len = this.statusUpdateLinesData.length;
    try {
      this.uploadService.GetLookupDetails(this.Lookuptype).subscribe(async data => {
        if (data && data.length > 0) {
          let pagenumber = data.find(x => x.isDefault === true && x.lookupText != null && x.lookupText != undefined).lookupDisplayText;
          this.pageSize = await Number(pagenumber);
          this.pageSizeOptions = data;
          let filteredList = data.filter(itemX => itemX.lookupText != null && itemX.lookupText != undefined);
          this.pageSizeOptions = filteredList.map(e => e.lookupDisplayText)
          this.activePageData = this.statusUpdateLinesData.slice(0, this.pageSize);

        }
      })
    }
    catch (error) {
      throw error;
    }
  }

  tableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageData = this.statusUpdateLinesData.slice(firstCut, secondCut);
  }
}
