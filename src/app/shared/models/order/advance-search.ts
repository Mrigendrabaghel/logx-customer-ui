
export class AdvanceSearchListModel{
    public fieldName:string;
    public searchType:string;
    public fromValue:string;
    public toValue:string;
}
export class AdvanceSearchResult{
    public AdvanceSearchListModel:AdvanceSearchListModel[];
    public gridColumn:string;
}

export class OrderLookupDetailModel
{
    public DeliverDate:DateField;
    public OrderCreatedDate:DateField;
    public OrderStatus:string;
    public OrderNumber:NumberField;
    public GBOLNumber:NumberField;
    public TCNNumber:NumberField;
    public OriginNumber:NumberField;
    public DestinationNumber:NumberField;
    public gridColumn:string;
    public priority:boolean;
    public todaysDate:Date;
    public PONumber:NumberField;
}


export class DateField
{
    public DateQualifier:string;
    public SearchConditionId:number;
    public SearchConditionValue:string;
    public FromDateValue:string;
    public ToDateValue:string;
    public TotalDays:number;
    public TotalHours:number;
}

export class NumberField
{
    public SearchConditionId:number;
    public SearchConditionValue:string;
    public Value: string;
    public OrderNumber:NumberField;
}

export class DocumentLookupDetailModel
{
    public deliverDate:DateField;
    public OrderCreatedDate:DateField;
    public DocumentCreatedDate: DateField;
    public OrderStatus:string;
    public OrderNumber:string;
    public GBOLNumber:NumberField;
    public TCNNumber:NumberField;
    public OriginNumber:NumberField;
    public DestinationNumber:NumberField;
    public gridColumn:string;
    public todaysDate:Date;
    public DocumentType: string;
}


