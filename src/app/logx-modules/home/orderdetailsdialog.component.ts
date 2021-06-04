import { Component, OnInit, ViewChild, Input ,Inject} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { OrderModel } from 'src/app/shared/models/order/order';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';
import { MatPaginator } from '@angular/material/paginator';
import { previewMatchSortingFn } from 'src/app/shared/common/common-method';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { OverlayContainer } from '@angular/cdk/overlay';


var ORDER_DATA:OrderModel[]=[];
@Component({
  selector: 'app-orderdetailsdialog',
  templateUrl: './orderdetailsdialog.component.html',
  styleUrls: ['./orderdetailsdialog.component.scss']
})
export class OrderdetailsdialogComponent implements OnInit {
 
  public orderModel:OrderModel[];
  displayedColumns: string[] = ['orderNumber', 'status', 'firstTCN', 
  'originLocation', 'deliveryLocation', 'pickUpDate','aDeliveryDate'];

  @ViewChild(MatSort,{static:false})sort:MatSort;
  @ViewChild(MatPaginator,{static:false})paginator:MatPaginator;
  
  dataSource = new MatTableDataSource(ORDER_DATA);
  value:any;
  searchString:string='';
  

  constructor(private dialogRef: MatDialogRef<OrderdetailsdialogComponent>,
    private router:Router,
    private dataTransfer:DataTransferService, public overlayContainer: OverlayContainer,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.dataSource = data.dataSource;
    this.searchString= data.searchstring;
  }

  ngOnInit(): void {    
    document.body.classList.add("dark-theme");
    this.overlayContainer.getContainerElement().classList.add("dark-theme");
  }
  
  ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator=this.paginator;
  this.dataSource.sortingDataAccessor =previewMatchSortingFn;
}

  closePopup(){
    this.dialogRef.close()
  }

  viewTrackDetails(element:any)
  {
    this.dataTransfer.loadData(element.orderNum);
    this.dialogRef.close()
    this.router.navigate([RouteLinks.publicorderdetails]);
  }

}
