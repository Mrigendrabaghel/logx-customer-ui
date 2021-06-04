

import { FileUpload } from 'src/app/shared/models/order/file-upload.model';

export class IncidentReportRequest {
    public IncidentRequest: IncidentRequest;
    public IncidentComments: IncidentComments[];
    public IncidentFileUpload: FileUpload;
}

export class IncidentRequest {

    // public ClientId: string; 
    // public Client: string;
    public incidentNum: string;
    public incidentDate: Date;
    //public IncidentTypeId: Number;
    public incidentType: string;
    public orderNum: string;
    public status: string;
    public PriorityCodeName: string;
    public externalNum: string;
    public tradingPartners: EntityDetails[] = [];
    public locations: EntityDetails[];
    public contact: Contacts;
}

export class EntityDetails {
    public entity: string;
    public entityNum: string;
    public entityType: string;
}

export class Contacts {
    public name: string;
    public cnum: string;
    public emailId: string;
    public isBillTo: boolean;
    public isRemitTo: boolean;
    public isActive: boolean;
}

export class IncidentComments {
    public entity: string;
    public entityNum: string;
    public commentType: string;
    public comment: string;
}

export class IncidentPostalDetails {

    public PostalCode: string;
    public StateCode: string;
    public StateName: string;
    public CityCode: string;
    public CityName: string;
    public LocationNumer: string;
    public CountryCode: string;
    public CountryName: string;
}

export class IncidentOrderDetails {

    public OrdHeaderId: Number;
    public CreatedBy: string;
    public Carrier: string;
    public OrderContactPersonName: string;
    public OrderContactPersonNumber: string;
    public Status: string;
    public LoadNumber: string;
    public TradingPartnerNum: string;
    public OrderContactNum: string;
}

export class IncidentLocationDetails {

    public LocationNumber: string;
    public LocationName: string;
    public LocationAddr1: string;
    public LocationAddr2: string;
    public LocationAddr3: string;
    public CityName: string;
    public PostalCode: string;
    public StateCode: string;
    public StateName: string;
    public CountryName: string;
    public CountryFipsCode: string;
}

export class IncidentCarrierDetails {

    public SearchCriteria: string;
    public SearchValue: string;
}

export class locationDetails {
    public ReportingPostalDetails: IncidentPostalDetails;
    public IncidentPostalDetails: IncidentPostalDetails;
    public ReportingLocation: string;
    public IncidentLocation: string;
    public LocationNumber: string;
    public LocationId: number;
    public Address1: string;
    public LocationName: string;
    public showUseAddress: boolean;


    constructor() {
        this.ReportingPostalDetails = new IncidentPostalDetails();
        this.IncidentPostalDetails = new IncidentPostalDetails();

    }

}


export class IncidentReportResponse {
    result: string;
    entityType: string;
    entities: Entities;
    entityResult: EntityResult;
}

export class Entities {
    successCount: number;
    failureCount: number;
    warningCount: number;
}
export class EntityResult {
    result: string;
    externalId: string;
    action: string;
    error_Message: string;
    error_Cause: string;
}

export class LocationInfo {
    searchCriteria: string;
    cityName: string;
    postalCode: string;
    stateCode: string;
    isReportingLoc: boolean = false;

}
export class Pagination {
    public pageNumber: number;
    public recordsPerPage: number;
    public pageName: string;
    public userId: string;
    public teamInfo: string;
}

export class IncidentDetails {
    incidentReportId: number;
    clientId: number;
    clientName: string;
    organizationId: number;
    orderNum: string;
    orderContactId: number;
    orderContactName: string;
    orderContactPhone: string;
    incidentCreatedDate: string;
    incidentTypeId: number;
    incidentTypeName: string;
    reportingLocationId: number;
    reportingAddrName: string;
    reportingAddress: string;
    reportingLocCity: string;
    reportingLocStateCode: string;
    reportingLocStateName: string;
    reportingLocCountryCode: string;
    reportingLocCountryName: string;
    reportingLocZip: string;
    userIdReported: string;
    userNameReported: string;
    reportedDate: string;
    incidentLocationId: number;
    incidentAddrName: string;
    incidentAddress: string;
    incidentLocCity: string;
    incidentLocStateCode: string;
    incidentLocStateName: string;
    incidentLocCountryCode: string;
    incidentLocCountryName: string;
    incidentLocZip: string;
    carrierID: number;
    carrierName: string;
    priorityId: number;
    priorityName: string;
    userId: string;
    incidentNumber: string;
    incidentDocuments: any[];
    incidentComments: any[];
    OrderContactNum: string
    ReportingLocationNum: string;
    IncidentLocationNum: string;
    CarrierNum: string;
    ClientNumber: string;
    IsComplete: boolean;
}

export class IncidentComment {
    ID: number;
    INCIDENTREPORTID: number;
    COMMENTS: string;
    CREATEDBY: string;
}

export class IncidentDocuments {
    public IncidentReportId: number;
    public DocType: string;
    public DocDescription: string;
    public FileType: string;
    public Content: string;
    public createdby: string;
    public DocName: string;
    public CreatedDate: Date;
    public DocNum: string;
}

export class IncidentDocumentsJson {
    public ID: number;
    public DOCTYPE: string;
    public DOCDESCRIPTION: string;
    public FILETYPE: string;
    public CREATEDBY: string;
    public INCIDENTREPORTID: number;
    public DOCNAME: string;
    public CREATEDDATE: Date;
}
