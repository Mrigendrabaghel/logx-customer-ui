import { DateField, NumberField } from '../order/advance-search';
import { IncidentLocationDetails, IncidentPostalDetails } from './report-incident.model';

export class IncidentAdvanceSearch {

    public IncidentStatus: String;
    public IncidentNumber: NumberField;
    public IncidentType: string;
    public ReportingPostalDetails: IncidentPostalDetails;
    public IncidentPostalDetails: IncidentPostalDetails;
    public ReportingLocation: string;
    public IncidentLocation: string;
    public IncidentDate: DateField;
    public IncidentCreatedDate: DateField;
    public OrderNum: NumberField;
    public Resolution: String;
    public ResolutionDate: DateField;
    public Priority: string;
    public ReportedBy: string;
    public gridColumn: string;
    public todaysDate: string;
    public pageNumber: number;
    public recordPerPage: number;
    public totalCount: number
}