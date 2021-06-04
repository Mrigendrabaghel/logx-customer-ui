export class OrderModel {
    public OrderId: number;
    public orderNum: string;
    public gbolNumber: string;
    public loadNumber: string;
    public bolNumber: string;
    public tcnNumber: string;
    public proNumber: string;
    public lastUpdatedDateTimeUtc: Date;
    public firstTcn: string;
    public originLocation: string;
    public deliveryLocation: string;
    public pickupDateTimeUtc: Date;
    public deliveryDateTimeUtc: Date;
    public lastMilestone: string;
    public lastKnownLocation: string;
    public status: string;
    public progress: string;
    public isViewDetailsDisplay: boolean;
    public isViewDocumentDisplay: boolean;
    public trackStatus: TrackStatus[];
    public gblNumber: string;
    public originAddress: string;
    public originAddress1: string;
    public originCityName: string;
    public originStateName: string;
    public originPostalCode: string;
    public deliveryAddress: string;
    public deliveryAddress1: string;
    public deliveryCityName: string;
    public deliveryStateName: string;
    public deliveryPostalCode: string;
}

export class ViewReportingDashboard {

    public OrderId: number;
    public OrderNumber: string;
    public BolNumber: string;
    public GBol: string;
    public OrderStatus: string;
    public MileStoneProgress: number;
    public PickupDate: string;
    public DeliveryDate: string;
    public OriginLocationName: string;
    public OriginLocation: string;
    public OriginStreetAddress: string;
    public OriginStreetAddress1: string;
    public OriginStreetAddress2: string;
    public OriginCity: string;
    public OriginState: string;
    public OriginCountry: string;
    public OriginPostalCode: string;
    public EarlyPickUpDate: string;
    public EarlyDeliveryDate: string;
    public OriginContactPersonName: string;
    public OriginContactPersonPhone: string;
    public OriginContactEmail: string;
    public DestinationLocationName: string;
    public DeliveryLocation: string;
    public DestinationStreetAddress: string;
    public DestinationStreetAddress1: string;
    public DestinationStreetAddress2: string;
    public DestinationCity: string;
    public DestinationState: string;
    public DestinationCountry: string;
    public DestinationPostalCode: string;
    public LatePickUpDate: string;
    public LateDeliveryDate: string;
    public DestinationContactPersonName: string;
    public DestinationContactPersonPhone: string;
    public DestinationContactEmail: string;
    public ServiceOption: string;
    public Equiment: string;
    public Carrier: string;
    public IsHazmat: boolean;
    public LastMileStone: string;
    public AccountsReceivableAmount: string;
    public AccountsReceivableStatus: string;
    public InvoiceNumber: string;
    public InvoiceStatus: string;
}

export class TrackStatus {
    status: string;
    location: string;
    actionDate: Date;
}

export class OrderHeaderModel {
    public orderNum: string;
    public orderCreatedBy: string;
    public originLocation: string;
    public originAddressLine: string;
    public originAddressLine1: string;
    public originCityName: string;
    public originState: string;
    public originZip: string;
    public originContactName: string;
    public originContactNum: string;
    public destinationLocation: string;
    public destinationAddressLine: string;
    public destinationAddressLine1: string;
    public destinationCityName: string;
    public destinationZip: string;
    public destinationContactName: string;
    public destinationContactNum: string;
    public destinationState: string;
    public pickupDateTimeUtc: Date;
    public deliveryDateTimeUtc: Date;
    public serviceOptionCode: string;
    public equipmentType: string;
    public carrier: string;
    public referenceNumbers: string;
    public distance: string;
    public distanceUOM: string;
    public isHazmat: boolean;
    public priority: boolean;
    public loadNum: string;

    public deliveryDateQualifier: string;
    public pickupDateQualifier: string;
    public status : string
    public deliveryLocation : string
    // public LocationName :string;
    // public StreetAddress:string ;
    // public City :string;
    // public ReferenceNumbers :string;

    // public ContactName :string;
    // public ContactNumber :Date;
    // public Distance :string ;
    // public Hazmatflag :string ;
    // public HotPriorityflag :string ;
    // public Actual :Date;
    // public Planned :Date ;
    // public Estimated :Date ;
    // public Carrier: string;
    // public EquipmentType: string ;
    // public ServiceOption: string ;
    // public State: string;
    // public ZipCode: number;
    // public ordernum:number ;
    // public createdby:string
}

export class OrderLinesModel {
    public orderLineId: number;
    public grossWeight: number;
    public grossVolume: number;
    public huCount: number;
    public huType: string;
    public pieceCount: number;
    public pieceType: string;
    public freightClass: string;
    public tcnNumber: string;
    public description: string;
    public length: number;
    public width: number;
    public height: number;
    public isHazmat: boolean;
    public uNclass: string;
    public hazmatContactNum: string;
    public packingGroup: string;
    public hazClass: string;
}

export class OrderCommentsModel {
    public commentType: string
    public comment: string;
    public stopNum: string;
}

export class StatusUpdateLines {
    public orderNum: string;
    public loadNumber: string;
    public carrier: string;
    public status: string;
    public city: string;
    public state: string;
    public zip: string;
    public refNumber: string;
    public dateTime: Date;
    public notes: string;

}

export class OrderAttachmentModel {
    public ordDocId: number;
    public documentNumber: string;
    public fileType: string;
    public docDescription: string;
    public documentType: string;
    public orderNum: string;
    public documentDate: Date;
}

export class OrderMapModel {
    public orderNumber: number;
    public startLocation: number[];
    public endLocation: number[];
}

export class OrderMilestoneModel {
    public lastModifiedDate: Date;
    public shipmentStatusCodeId: string;
    public shipmentStatusCode: string;
    public shipmentStatus: string;
    public milestoneStatus: string;
    public createdDate: Date;
    public statusUpdateDate: Date;
    public  city:string;
    public  state:string;
    public  zipCode:string;
    public sorder: number;
}

export class OrderTransitMap {
    public orderHeaderId: number;
    public orderNum: string;
    public originAddresName: string;
    public originAddr1: string;
    public originAddr2: string;
    public originAddr3: string;
    public originCity: string;
    public originPostalCode: string;
    public originLatitude: number;
    public originLongitude: number;
    public originStateCode: string;
    public originStateName: string;
    public originCountryName: string;

    public destinationLocNum: string;
    public destinationAddressName: string;
    public destinationAddr1: string;
    public destinationAddr2: string;
    public destinationAddr3: string;
    public destinationCity: string;
    public destinationPostalCode: string;
    public destinationLatitude: string;
    public destinationLongitude: string;
    public destinationStateCode: string;
    public destinationStateName: string;
    public destinationCountryName: string;

}

export class StopMarker{
    public latitude:number;
    public longitude:number;
    public label:string;
}

export class LatLngBounds{
    public north:number;
    public south:number;
    public east:number;
    public west:number;
}

export class bulkSearchDetails {
    public SearchCriteria: string;
    public SearchValue: string;
}

export class OrderGrid {
    public headingid: number;
    public headingCategory: string;
    public headingDBColumn: string;
    public headingDisplayText: string;
    public headingSubCategory: string;
    public languageId: number;
    public isDefault: boolean;
    public sortorder: number;
    public username: string;
    public userId: number;
}

export class AccessorialCodeDetails {
    public OrderNumber: string;
    public OrderHeaderId: string;
    public AccessorialCode: string;
    public AccessorialName: string;
    public AccessorialStatus: string;
    public UserName: string;
    public CreatedDate: string;
}