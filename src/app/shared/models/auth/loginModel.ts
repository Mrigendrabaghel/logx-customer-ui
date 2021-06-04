export class LoginModel {
    public Username: string = "";
    public Password: string = "";
    public Usertype: number;
    public Token: string = "";
}

export interface RegistrationDropdownModal {
    isDefault: boolean;
    languageId: number;
    lookupDataId: number;
    lookupDisplayText: string;
    lookupText: string;
    lookupType: string;
}

export interface RegistrationSaveModal {
    UserName: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    UserAccount: string;
    MilitaryRank: string;
    CivilServiceGrade: string;
    UnitName: string;
    MailingAddress1: string;
    MailingAddress2: string;
    MailingCity: string;
    MailingState: string;
    MailingCountry: string;
    MailingZipCode: string;
    Phone_Office: string;
    Phone_Cell: string;
    EmailAddress: string;
    Installation: string;
    DODAAC: string;
    CAGECode: string;
    SPLC: string;
    GBLOC: string;
    Role: string;
    Team: string;
    BasicAccess: string;
    AdditionalAccess: string;
    SpecialInstruction: string;
    ServiceCommand: string;
    ServiceCommandValue: string;
}

export class ValidateUserModel {
    public UserName: string = "";
    public EmailId: string = "";
    public Operation: string;
}