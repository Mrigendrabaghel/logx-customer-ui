
export class FileUpload
    {
         OrganizationName:string;
         entity:string='';
         entityDescription :EntityDescription;
         Docs :Docs[];        
    }

    export class EntityDescription
    {
        EntityNum :string = '';
        EntityType:string='';
    }

    export class Docs
    {
        DocNum :string = '';
        DocType :string;
        DocFormat:string;
        DocContent :string;
        DocName  :string;
        DocDescription  :string;
        DocDate:Date;
    }

    export class FileUploadResponse
    {
        result :string;
        entityType :string;
        entities : Entities;
        entityResult :EntityResult;
    }


    export class Entities
    {
       successCount :number;
       failureCount:number;
       warningCount :number;      
    }

    export  class EntityResult
    {
       result :string;
       externalId :string;
       action :string;
      // documentName :string; // need this
      error_Message:string;
      error_Cause:string;
    }

    export class DocTypeLookUp
    {
        lookupDataId: number;
        lookupType: string;
        lookupText: string;
        lookupDisplayText: string;
        languageId: number;
        isDefault:boolean;
    }
    export class DocFileExist
    {
        DocNum :string = '';
        DocType :string;
    }

    export enum UploadFileResposeType {
        Success = 'success',
        Warning = 'warning',
        Failure = 'failure',
        Info = 'Info',
        TotalSuccess= 'total success'  ,
        TotalFailure = 'total failure',
        PartialSuccess = 'partial success'

      }
