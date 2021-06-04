
export class Accessorials {
    public dateOfFiling:string;
    public orderNumber:string;
    public accessorialCode:string;
    public accessorialName:string;
    public bol:string;
    public vloscn:string;
    public serviceExceptionId: Number;
    public serviceExceptionNum: string;
    public totalRecords:Number;
    public totalPendingCount: Number;
}

export class accessorialGrid
{
   public headingid: number;
    public headingCategory: string;
    public headingDBColumn: string;
    public headingDisplayText: string;
    public languageId: number;
    public isDefault: boolean;
    public sortorder: number;
    public username: string;
    public userId: number;

}

export class attachmentGridCol {
    public headingDBColumn: string;
}

export class attachmentCol {
    public DocDate: string;
    public DocName: string;
    public DocDescription: string;
    public DocFormat: string;
    public DocDescription1: string;
}

export class accessorialAttachment
{
    public  serviceExceptionDocId :number;
    public  documentDate:string;
    public  documentType:string;
    public  docDescription :string;
    public  fileType :string;
    public serviceExceptionNum: string;

}

export class AccessorialStatus
    {
        public entity:string; 
        public entityNum: string; 
        public accessorialStatus: string;
    }

    export class AdditionalInfo {
        public entity: string;
        public entityNum: string;
        public commentType: string;
        public comment: string;
    }

    export class AccessorialAdditionalInfoRequest
    {
        public incidentComments:AdditionalInfo[]; 
        public accessorialStatus: AccessorialStatus; 
    }


export class accessorialDetails {
        public dateOfFiling: string;
        public trackingNumber: string;
        public carrierName: string;
        public driverPOCName: string;
        public driverPOCPhone: string;
        public bOL: string;
        public vLOSCN: string;
        public occurrenceDate: string;
        public approvalStatus: string;
        public accessorialCode: string;
        public accessorialName: string;
        public requiredDocumentation: string;
    }

    export class accessorialShowComments
    {
        public orderHeaderID:number; 
        public orderNumber: string; 
        public serviceExceptionNum: string;
        public serviceExceptionId: number;
        public comment: string;
    }

    export class accessorialSaveCommentsRequest
    {
        public incidentComments:AdditionalInfo[];         
    }

    export class PaginationCriteria
   {
      public searchCriteria:string;
      public pageNumber:number;
      public recordPerPage:number;
      public todaysDate: Date;
      public gridColumn: string;
      public oktaTeam: string;
      public userId: string;
      public teamInfo: string;
      public pageName: string;
   }

