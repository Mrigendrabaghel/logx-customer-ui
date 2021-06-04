import { locationDetails } from "./incident/report-incident.model";

export class UserPreferenceDetails {
    PreferenceId : number;
    UserId:number;
    Language:string;
    Pagination:string;
    FavoriteMenu:string;
    Notification:string;
    Notification_StartTime : any;
    Notification_EndTime : any;
    TimeZone:string;
    DateFormat:Date;
    TimeFormat:string;
    Density:string;
    Area:string;
    Dimension: string;
    Distance:string;
    Temperature: string;
    Volume: string;
    Weight: string;
    Locations:any;

}



export class Locations{
    UserLocId :number; 
    UserId:  number; 
    LocId : number;
    LocationName: string;
    Address1: string;
    Address2 :string;
    City:string;
    StateCode:string;
    StateName:string;
    CountryCode:string;
    CountryName:string;
    ZipCode:string;
    IsDefault: boolean;
}

export class DefaultLocations{
    UserLocId :number; 
    UserId:  number; 
    LocId : number;
    LocationName: string;
    Address1: string;
    Address2 :string;
    City:string;
    StateCode:string;
    StateName:string;
    CountryCode:string;
    CountryName:string;
    ZipCode:string;
    IsDefault: boolean;
    Locations: any;

}
export class userAccess {
    userid: string="";
    username: string;
    useraccessid: number;
    useraccessname: string;
    useraccessdescription: string;
    tracktrace: boolean;
    accessdocuments: boolean;
    approveaccessorials: boolean;
    reportincidents: boolean;
    submitorders: boolean;
    approveorders: boolean;
    documents: string;
    incidents: string;
    accessorials: string;
    serviceexceptions: string;
    reporting: string;
    profilepreferences: string;
    milestonevisibility: string;
    additionalaccess: string;
    userteamid: number;
    teamname: string="";
    userlanguage: string;
}