
export const Version = '2021.2';
//Incident Report
export const IncidentConst = {
    reportIncidentTitle: "Report an Incident",
    reportIncidentadvsearch: "Advanced Search",
    client: "Client",
    incidentNumber: "Incident Number",
    NewReportNumber: "Report New Incident",
    incidentDate: "Incident Date",
    incidentCreatedDate: "Incident Created Date",
    incidentType: "Incident Type",
    orderNum: "Order Number",
    orderInformation: "Order Information",
    incidentInformation: "Incident Information",
    location: "Location",
    repLocation: "Reporting Location",
    incLocation: "Incident Location",
    reportedBy: "Reported By",
    reportedDate: "Reported Date",
    orderContactName: "Order Contact Name",
    orderContactNumber: "Order Contact Number",
    carrier: "Carrier",
    incidenttype: "incidenttype",
    oktaTokenStorage: "okta-token-storage",
    incidentComments: "Incident Report Comments",
    comment: "Comment",
    organizationName: "Crowley Logistics Inc",
    scac: "scac",
    mccNum: "mccNum",
    priority: "Priority",
    matCarrierTooltip: "Type atleast 3 characters of the carrier name, prefix with $ to search by SCAC and prefix with # to search by MC number.",
    matTooltipHideDelay: "100000",
    comments: "Comments",
    addMoreComments: "+ Add More Comments",
    attachments: "Attachments",
    date: "Date",
    fileName: "File Name",
    description: "Description",
    fileType: "File Type",
    addFILES: "Add FILES",
    uploadFILES: "Upload Files",
    saveLater: "Save For Later",
    fileFormat: ".jpeg,.png,.doc,.docx,.pdf,.xls,.xlsx,.msg,.txt",
    Load: "Load",
    TradingPartner: "TradingPartner",
    Pending: "Pending",
    clientName: "DFTS",
    failureMessage: "Incident Report Submission Unsuccessful",
    successMessage: "Your incident has been raised. For further review the number is ",
    yourIncident: "Your incident ",
    submitMsg: " has been submitted.",
    saveMsg: " has been saved as a draft",
    reportingLocation: "ReportingLocation",
    incidentLocation: "IncidentLocation",
    incidentReport: "IncidentReport",
    draftIncidentGrid: "draftIncidentGrid",

    validationMessage: {
        incidentType: "Incident type required",
        incidentDate: "Incident date required",
        orderNumber: "Order number required",
        cityName: "City name required",
        zipCode: "Zip code required",
        stateName: "State name required",
        incLoc: "Location information required",
        invalidZipCode: "No record Found",
        invalidOrderNum: "Not a valid order number",
        confirmDelete: "Are you sure you want to delete this comment?",
        confirmClear: "Are you sure you want to Clear this report incident? or you have to re-enter the information?",
        filesUploadMax: "Max 50 files can be uploaded.",
        success: "success",
        confirmRemoveFile: "Are you Sure you want to delete ",
        filesUploadSize: "Note: You can upload only PDF, word, excel, .msg, jpeg, png, and text files. The file size upto 20 MB."
    },
    placeHolder: {
        date: "Choose a date",
        option: "Choose an option",
        orderNumber: "Enter Order Number",
        zipCode: "Zip Code",
        state: "Select State",
        city: "Select City",
        location: "Location number, name or street address, name",
        carrier: "Carrier name or SCAC or MC#",
        comments: "Write comments here.....",
        incidentType: "Select Incident Type"
    }
}

export const IncidentAdvSearchConst = {
    incident: "Incident",
    location: "Location",
    noIncRecordFound: "No Incident Record Found.",
    total: "Total Records",
    incidentReports: "Incident Reports",
    reportsAnIncident: "Report An Incident",
    incidentadvsearch: "ADVANCED SEARCH",
    incidentStatus: "Incident Status",
    incidentNumber: "Incident Number",
    dateofIncident: "Date of Incident",
    incidentCreatedDate: "Incident Created Date",
    resolution: "Resolution",
    resolutionDate: "Resolution Date",
    incidentReportType: "Incident Report Type",
    gridIncidentAdvSearchColumn: "INCIDENT_NUM,ORDNUM,INCIDENT_CREATED_DATE,INCIDENT_REPORTTYPE,INCIDENT_LOCATION,REPORTING_LOCATION,REPORTED_BY,Priority,INCIDENT_DATE,INCIDENT_RESOLUTION,INCIDENT_RESOLUTION_DT"
}
export const CommonConst = {
    guiValidation: {
        minPostalCodeLength: "4"
    },
    globalErrorMessage: {
        error: "An error occurred",
        notificationError: "Error occured , Please contact Administrator.",
        notificationDelete: "Are you sure want to delete?",
        yesreject: "Yes, Reject",
        nocancel: "NO, CANCEL",
        accessorialReject: "Are you sure you want to reject the accessorial request?",
        reasonForReject: "Reason For Rejection",
        reasontitle: "Reason",
        submit: "Submit",
        cancel: "Cancel"
    },
    MatIcons: {
        arrow_circle_down: "arrow_circle_down",
        fullscreen: "fullscreen",
        clear: "clear",
        cancel: "cancel",
        assignment_turned_in: 'assignment_turned_in',
        grading: 'grading',
        info: 'info',
        menu: 'menu',
        library_books: 'library_books',
        search: 'search',
        edit: 'edit',
        copyright: 'copyright',
        call: 'call',
        location: 'location_on',
        help: 'help',
        keyboard_arrow_down: 'keyboard_arrow_down',
        keyboard_arrow_up: 'keyboard_arrow_up',
        keyboard_arrow_right: 'keyboard_arrow_right',
        add_box: 'add_box',
        account_circle: 'account_circle',
        power_settings_new: 'power_settings_new',
        indeterminate_check_box: 'indeterminate_check_box',
        settings: 'settings',
        home_icon: 'home',
        more_vert: "more_vert",
        notification_impt: 'notification_important',
        delete: 'delete',
        checkCircle: "check_circle"
    },
    notifications: {
        Notifications: 'Notifications',
        nodata: "No notifications found",
        noResult: "No notifications found for last ",
        days: " days",
        msgLength: 80,
        pageMsgLength: 150,
        readMore: 'Read more',
        openAction: 'open',
        deleteAction: 'delete',
        viewAllAction: 'viewAll',
        closeAction: 'close',
        totalNotifications: 'Total Notifications: ',
        unreadNotifications: 'Unread Notifications: ',
    },
    nodata: "No records found for your search.",
    minLength: 6,
    maxLength: 17,
    errors: "errors",
    close: "Close",
    download: "Download",
    btnClose: "Close",
    btnCancel: "Cancel",
    btnClear: "Clear",
    btnSubmit: "Submit",
    btnSearch: "Search",//
    btnSaveForLater: "Save For Later",
    btnSaveContinue: "Save & Continue",
    btnSaveCreateLink: "Save And Create Link",
    btnSaveSubmit: "Save & Submit",
    btnDelete: "Delete",
    btnRemove: "Remove",
    btnEdit: "Edit",
    uploadFiles: "Upload Files",
    btnAddFiles: "Add Files",
    description: "Description",
    required: "required",
    incidentreports: "incidentreports",
    docType: "Document Type",
    fileName: "File Name",
    files: "Files ",
    btnExport: "Export",
    submit: "Submit",
    save: 'Save',
    totalDocuments: "Total Documents: ",
    dateFormat: "MM/dd/yyyy",
    yes: "Yes",
    Close: "Close",
    addSearch: "Add Search",
    cancel: "Cancel",
    add: "Add",
    Download: "Download",
    fullYear: new Date().getFullYear(),
    footerText: " Copyright Crowley Maritime Corporation",
    undefined: 'undefined',
    null: null,
    addComments: '+Add more comments',
    Reject: 'Reject',
    additionalInfo: 'Request Additional Info',
    moreInfo: "More Info",
    Approve: 'Approve',
    Logout: 'Logout',
    Blob: 'blob',
    ErrorOccurred: 'An error occurred:',
    SomethingWrong: 'Something bad happened; please try again later.',
    AccessorialAttachmentPageRows: 'Rows Per Page',
    viewTrackingDetails: 'View Tracking Details',
    trackAnotherShipment: 'Track Another Shipment',
    logintoviewdocuments: 'Log In to View Documents',
    logintoviewdetails: 'Log In to View Details',
    globalTrackErrorMessage: 'We are unable to locate your shipment with that information, please try again.',
    multipleRecords: 'There are multiple records related to this number.',
    invalidDate: 'Invalid date format',
    entityNum: 'entityNum: ',
    seComment: 'Service Exception Comment :',
    mileStoneProgress: 'MileStoneProgress',
    YES: 'Yes',
    NO: 'No',
    OK: 'Ok',
    deleteConfirm: 'Yes, Delete',
    preference: 'My Preferences',
    preferences: 'My Preferences',
    allColumns: 'OrderNumber,BOLNumber,GBol,OrderStatus,MileStoneProgress,PickupDate,DeliveryDate,OriginLocationName,OriginPostalCode,OriginCity,OriginState,EarlyPickUpDate,LatePickUpDate,OriginContactPersonName,OriginContactPersonPhone,OriginContactEmail,DestinationPostalCode,DestinationCity,DestinationState,EarlyDeliveryDate,LateDeliveryDate,DestinationContactPersonName,DestinationContactPersonPhone,DestinationContactEmail,ServiceOption,Equiment,Carrier,IsHazmat,LastMileStone,AccountsReceivableAmount,AccountsReceivableStatus,InvoiceNumber,InvoiceStatus',
    orderAdditionalInfo: "orderAdditionalInfo",
    placeHolder: { selectOption: 'None' }
}
//This is a generic set of Numbers which can be used anywhere which does not have any functionality dependent.  
export const commonNumbers = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eleven: 11,
    twelve: 12,
    twentyFour: 24,
    ten: 10,
    fortyNine: 49,
    hundred: 100,
    threeHundredSixty: 360,
    oneThousandAndTwentyFour: 1024,
    nine: 9,
    fifteen: 15,
    fourteen: 14,
    sixteen: 16,
    twenty: 20
}

//Access Documents 
export const DocumentsConst = {
    AccessDocuments: {
        fullScreenTitle: "Full screen",
        searchAccessDocument: "searchAccessDocument",
        searchCriteria: "searchCriteria",
        cancel: "cancel",
        searchDoc: "Search Document",
        searchDocuments: "Search Documents",
        accessDocNote: "Search by Order, Load, BOL, GBL, or TCN number.",
        accessDocuments: "Access Documents",
        open: "Open ",
        orderNumber: " Order Number ",
        article: "article ",
        loadnumber: " Load Number ",
        gbl: " GBL ",
        tcn: " TCN ",
        docType: " Document Type ",
        docDescr: " Document Description ",
        docDate: " Document Date ",
        documentId: " documentId ",
        documentName: " documentName ",
        documentFormat: " documentFormat ",
        default: "default",
        preview: "Preview",
        fullScreen: "FullScreen",
        docx: "docx",
        doc: "doc",
        xls: "xls",
        msg: "msg",
        pdf: "pdf",
        pdfContentType: "application/pdf",
        jpg: "jpg",
        jpeg: "jpeg",
        jpegContentType: "image/jpeg",
        png: "png",
        text: "text",
        txt: "txt",
        xlsx: "xlsx",
        pngContentType: "image/png",
        textContentType: "text/plain",
        xlsxContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        docxContentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        xlsContentType: "application/vnd.ms-excel",
        docContentType: "application/msword",
        msgContentType: "application/vnd.ms-outlook",
        previewNote: "Please download the file to preview",
        pdfDocFormat: "Pdf",
        Word: "Word",
        Jpg: "Jpg",
        Html: "Html",
        Text: "Text",
        tiff: "tiff",
        tiffContentType: "image/tiff",
        htmlContentType: "text/html",
        html: "html",
        word: "word",
        Excel: "Excel",
        excel: "excel"
    },
    ErrorMessage: {
        searchError: " Please provide a Search Value.",
        docSearchMinLengthError: " Track number must be at least 6 characters",
        searchValueValidError: " Search values must have atleast 6 characters and no more than 17 characters.",
        searchMinLengthError: "Individual search value not more than 6.",
        advanceSearch: "Advanced Search"
    }

}

export const homeComponentConst = {
    confirmationMessage: {
        headerString: "Track Shipment Results",
        multipleRecordHeader: "Displaying results for"
    },
    sideNavItems: ['Home', 'Contact Us', 'About Us', 'Help', 'Register'],
    widgetName: 'widgetName',
    loginText: 'Sign Up/Log In',
    loginTextMobile: 'Login',
    menuText: 'Menu',
    pleaseText: 'Please',
    copyrightText: 'Copyright',
    registerText: 'REGISTER',
    text: 'text',
    trackNumberField: 'trackNumberField',
    placeHolder: 'Track Your Shipment',
    trackShipment: 'Track Shipment',
    notifications: 'Notifications',
    inputHeaderText: {
        govtShipment: 'A single Touch Point for Shipments',
        crowelyName: 'Crowley Solutions',
        trackTrace: 'TRACK & TRACE',
        trackInputText: 'Track by an Order, Load, BOL, PO, GBL, or TCN Number.',
        securetrackInputText: 'Track by your Order, Load, BOL, PO, GBL, or TCN Number',
        trackShipment: 'Track Shipment',
        crowleyWorkBox: 'Crowley works to help you work.',
        trackPackage: 'Track your package with your order number Track your package with your order number.',
        watchDemo: 'WATCH DEMO',
        tryFree: 'TRY IT FOR FREE',
        accessDocHeader: 'ACCESS DOCUMENTS',
        submitOrder: 'SUBMIT ORDERS',
        orderReport: 'ORDER LOOKUP'

    },
    errorMessage: {
        numberRequired: 'Track number is required',
        minLength: 'Track number must be at least 6 characters',
        characterLength: 'Track number length should not greater than 17 characters',
        numberOfRecordLimit: "Too many records match this data, please refine your search.",
        numberExceededMobile: 'Too many results found for',
        recordNotFound: 'We are unable to locate your shipment with that information, please try again.',
        noResultMobile: 'No results found for',
        goToHomePage: 'Return to the homepage',
        tryAgain: ' to try your search again.'
    },
    footerItems: ['Home', 'Why Trust Us', 'Sitemap', 'Terms of use', 'Privacy policy', 'Blog', 'Contact Us']
}

export const registrationConst = {
    errorMessage: {
        firstName: 'First Name is required',
        lastName: 'Last Name is required',
        phoneNumber: 'Phone Number is required',
        maxLength: 'Please enter only 10 numbers',
        email: 'Email Address is required',
        dodaac: 'dodaac is required',
        emailFormat: 'Email address is incorrect',
    }
}

export const AdvanceSearchAccessDoc = {
    advancedsearchmobiletile: 'Advanced Search',
    daysFromToday: 'Days +/- from Today',
    hoursFromToday: 'Hours+/- from Current',
    search: 'search',
    cancel: 'cancel',
    lookUpParam: {
        DateSearch: 'DateSearch',
        TextSearch: 'TextSearch',
        DocType: 'DocType',
        status: 'status',
        DateFilter: 'DateFilter',
        datehour: 'datehour'
    },
    dateQualifier: {
        fixed: 'fixed',
        relative: 'relative',
        blank: 'blank',
        between: 'between'
    },
    accessDocText: {
        todalDays: 'TotalDays',
        totalHours: 'TotalHours',
        formName: 'Access Documents',
        gridColumn: "OrderNumber,LoadNo,GBOL,TCN,ReferenceNumbers,OrderStatus,DocumentType,DocumentDescription,DocumentCreatedDate,DocNum,DocumentFormat,DocumentGroup,LoadDocId,DocumentName"
    },
    orderText: {
        totalOrderDays: 'TotalODays',
        totalOrderHours: 'TotalOHours',
        formName: 'Order Lookup',
        gridColumn: "OrderId,OrderNumber,GBol,OrderStatus,PickupDate,DeliveryDate,MileStoneProgress"
    },
    inputLabels: {
        deliveryDate: 'Delivery Date',
        docCreatedDate: 'Document Created Date',
        docType: 'Document Type',
        orderCreatedDate: 'Order Created Date',
        orderStatus: 'Order Status',
        orderNumber: 'Order Number',
        PONumber: "PO Number",
        gblNumber: "GBL Number",
        orderPickupDate: "Pick Up Date",
        orderDeliveryDate: "Delivery Date",
        orderProgress: "Order Progress",
        GBOL: 'GBOL',
        TCN: 'TCN',
        orderOriginNumber: 'Order Origin number',
        orderDestinationNumber: 'Order Destination number'
    },
    placeHolder: {
        selectDocType: 'Select Document Type',
        chooseStartDate: 'Choose start date',
        chooseEndDate: 'Choose end date',
        chooseOption: 'Choose an option',
        chooseOrderStatus: 'Select Order Status',
        enterOrderNumber: 'Enter Order Number',
        enterPONumber: 'Enter PO Number'
    },
    buttons: {
        cancel: 'Cancel',
        search: 'Search',
        accessdocument: "Access Documents"
    }
}

export const UploadConst = {
    FileNotSupported: "FileNotSupported",
    incidentreports: "incidentreports",
    lookUpIncident: "Incident Report Documents",
    dateFormat: "MM/dd/yyyy HH:mm:ss",
    en: "en",
    readError: "Unable to read..",
    maxSize: "MaxSize",
    fileExist: "FileExist",
    uploadFilesMax: "UploadFilesMax",
    maxUploadMsg: "Max 50 files can be uploaded.",
    deleteMsg: "Are you Sure you want to Delete ",
    question: " ?",
    deleteYes: "Yes, Delete",
    clearYes: "Yes, Clear",
    ok: "Ok",
    cancel: 'Cancel',//
    deleteCancel: "No, Cancel",
    maxUploadSize: 50,
    files: "files",
    fileExtensionsSupport: ".pdf,.doc,.docx,.xls,.xlsx,.msg,.jpeg,.jpg,.png,.txt",
    fileTooLargeMsg: " size is too large to upload.",
    fileExistMsg: " already exist with same Document Type.",
    fileExistIncidentMsg: " already exist.",
    fileNotSupportdMsg: " not supported to upload.",
    uploadFileNote: "Note: You can upload only PDF, word, excel, .msg,jpeg, png, and text files. The file size upto to 20 MB.",
    uploadSuccessful: "Document successfully uploaded",
    uploadUnsuccessful: "Document not uploaded"

}
export const docTypeListConst = {
    pod: "POD",
    serviceExceptionDocs: "Service Exception Documents",
    lookUpIncident: "Incident Report Documents",
    accessorialForm: "Accessorial Form",
    reWeighTicket: "ReWeigh Ticket"
    }

export const OrderSearchReport = {
    orderResult: "Order Results",
    querySnappyCopy: "Snappy copy here...",
    queryWords: "'Words and stuff...",
    queryReportTCN: "'Report TCN Test...",
    queryFourthChip: "The fourth chip yay...",
    searchOrderCriteria: "Search by your Order, Load, BOL, GBL, PO, Pro OR TCN number.",
    searchOrder: 'Search by your Order, Load, BOL, GBL, PO, or TCN Number.',
    btnSearchOrder: "Search Order",
    searchAndReporting: "Search & Reporting",
    orderLookUp: "Order Lookup",
    orderNumber: "Order Number",
    status: "Status",
    deliveryDateTime: "Delivery Date/Time",
    btnCancel: "Cancel",
    btnApply: "Apply"

}

export const OrderDetailConst = {
    locationInformation: "Location Information",
    grossWeight: "Gross Weight",
    grossVolume: "Gross Volume",
    huCount: "HU Count",
    huType: "HU Type",
    pieceCount: "Piece Count",
    pieceType: "Piece Type",
    freightClass: "Freight Class",
    tcn: "TCN",
    description: "Description",
    length: "Length",
    width: "Width",
    height: "Height",
    hazmat: "Hazmat",
    commentType: "Comment Type",
    comment: "Comment",
    stopNumber: "Stop Number",
    date: "Date",
    types: "Types",
    document: "Document",
    fileType: "File Type",
    loadNub: "Load #",
    carrier: "Carrier",
    statusEvent: "Status Event",
    city: "City",
    state: "State",
    zip: "Zip",
    notes: "Notes",
    dateTime: "Date/Time",
    originLocation: "Origin Location",
    contactName: "Contact Name",
    contactNumber: " Contact Number",
    pickUpDate: "Pickup Date",
    deliverLocation: "Delivery Location",
    deliveryDate: "Delivery Date",
    distance: "Distance",
    priority: "Priority",
    referNumb: "Reference Numbers",
    orgnizationName: "Crowley Logistics Inc",
    load: "Load",
    uploadFile: "Upload File",
    uploadSuccess: "Uploaded Successfully !",
    uploadUnSuccess: "Upload Unsuccessful!",
    uploadPartial: "Uploaded Partially. Files",
    notloaded: " not Uploaded.",
    uploadFailed: "Upload Failed.",
    success: "success",
    orderNumb: "Order Number",
    origin: "Origin",
    destination: "Destination",
    additionalInfo: "Additional Information",
    btnSaveandSubmit: 'Save & Submit',
    btnSaveandSubmitALL: 'Save & Submit All',
    orderLineItems: "Order Line Items (",
    closeBrace: ")",
    lineOfRouting: "Timeline (",
    attachment: "Attachments (",
    comments: "Comments (",
    exportdataCsv: "ExportDataCsv",
    low: "Low",
    high: "High",
    no: "No",
    yes: "Yes",
    n: "N",
    y: "Y",
    cityStateZip: "City,State zip",
    dateFormat: "MM/dd/yyyy hh:mm a",
    exportPdfFileName: "ExportOrderDetails.pdf",
    serviceOptions: "Service Options",
    equipmentType: "Equipment Type",
    unClass: "UN Class :",
    hazmatContactno: "Hazmat Contact Number :",
    packingGroup: "Packing Group :",
    hazClass: "Haz Class : ",
    inTransitMap: "In-Transit Map",
    new: "New",
    orderReceived: "Order Received",
    pendingPickup: "Pending Pickup",
    arrivePickup: "Arrive Pickup",
    inTransit: "In Transit",
    deliveryScheduled: "Delivery Scheduled",
    arrivedatDelivery: "Arrived at Delivery",
    delivered: "Delivered",
    podReceived: "POD Received",
    closed: "Closed",
    orderTracking: "Order Tracking",
    gbolNumber: "GBOL Number",
    loadNumber: "Load Number",
    docNotUploaded: "Documents are not Uploaded !",
    stops: "Stops",
    incidentReport: "Incident Report",
    incidentReportType: "Incident Type",
    incidentReportDate: "Created Date",
    incidentReportStatus: "Status",
    serviceException: "Service Exception",
    ExceptionType: "Exception Type",
    Date: "Date",
    LineItem: "Line Item"
}


export const DashboardConst = {
    formValidation: {
        trackSubmitted: 'trackSubmitted',
        accessDocSubmitted: 'accessDocSubmitted',
        orderSubmitted: 'orderSubmitted'
    },
    controlName: 'orderLookupField',
    placeHolder: {
        trackShipment: 'Track your Shipment',
        findOrders: 'To enter multiple numbers, separate by comma (,)',
        findDocuments: 'To enter multiple numbers, separate by comma (,)'
    },
    errorMessage: {
        characterLimit: 'Search values must have atleast 6 characters and no more than 17 characters.',
        orderNumberRequired: 'Order number is required',
        orderNumberLimit: 'Number must be at least 5 characters',
        orderCharLimit: 'Search values must have atleast 5 characters and no more than 17 characters.',
        docNumberRequired: 'Number is required',
        docNumberLimit: 'Number must be at least 6 characters'
    },
    inputLabels: {
        findOrderText: 'Search Order',
        searchOrder: 'Search by your Order, Load, BOL, PO, GBL, or TCN Number.',
        findDoc: 'Search Document',
        viewDetails: 'View Details',
        searchDoc: 'Search by your Order, Load, BOL, GBL, or TCN Number.',
        approveAccessorials: 'APPROVE ACCESSORIALS',
        reportInc: 'REPORT INCIDENTS',
        approveOrder: 'APPROVE ORDERS',
        kpiReports: 'KPI REPORTS',
        inboundOrders: 'INBOUND ORDERS',
        dashboardReports: 'DASHBOARD REPORT',
        crowleyAd: 'Crowley Ad & Image',
        viewDoc: 'View Documents'
    },
    userGroupId: 1234,
    gridColumnValue:'OrderNumber, GBol, OrderStatus, MileStoneProgress, PickupDate, DeliveryDate'
}

export const StatusUpdateRouting = {
    lookUpType: 'grid-pagecount',
    default: "default",
    tableValues: {
        load: 'Load #',
        Carrier: 'Carrier',
        statusEvent: 'Status Event',
        address: 'City,State',
        noted: 'Notes',
        dateTime: 'Date/Time',
        loadNumber: 'Load Number'
    },
    noRecord: 'No records found.',
    podReceived: 'pod received'
}

export const TrackOderConst = {
    trackTraceText: 'Track & Trace',
    bulkSearch: 'Bulk Search',
    trackNumberFieldSecure: 'trackNumberFieldSecure',
    tableValues: {
        Status: 'Status',
        lastUpdated: 'Last Updated',
        tcn: 'First TCN',
        originLocation: 'Origin Location',
        deliveryLocation: 'Delivery Location',
        pickUpDate: 'Pick Up Date'
    },
    placeHolder: {
        enterNumber: 'To enter multiple numbers, separate by comma (,)'
    }
}

export const SubmitOderConst = {
    submitOrder: 'Submit Orders',
    approveOrders: 'Approve Orders',
    createdBy: 'Created By',
    orderNumber: 'Order Number',
    created: 'Created',
    modified: 'Modified',
    shipWith: "Ship with",
}

export const ExportDataConst = {
    exportOrderDetailTitle: "Export Order Details",
    selectoptions: "Please select the following options:",
    fileFormat: "File Format",
    exportPdf: "PDF",
    exportCSV: "CSV",
    orderDetails: "Order Details",
    comments: "Comments",
    attachmentSummary: "Attachment Summary",
    items: "Items",
    lineItems: "Lines of Routing",
    selOptionMsg: " Please select data to be exported .",
    selFileFormat: "Please select FileFormat and data to be exported .",
    selectFileFormat: "Please select FileFormat .",
    expCsv: "csv",
    docType: "DocType",
    itemSel: "ItemSel",
    exportData: "ExportData",
    safari: 'Safari',
    Chrome: 'Chrome',
    target: 'target',
    blank: '_blank',
    data: 'data',
    type: 'text/csv;charset=utf-8;',
    download: 'download',
    hidden: 'hidden',
    csv: '.csv',
    href: 'href',
    object: 'object',
    originLocation: 'originLocation',
    originAddressLine: 'originAddressLine',
    originCityName: 'originCityName',
    originState: 'originState',
    originZip: 'originZip',
    destinationLocation: 'destinationLocation',
    destinationAddressLine: 'destinationAddressLine',
    destinationCityName: 'destinationCityName',
    destinationState: 'destinationState',
    destinationZip: 'destinationZip',
    priority: 'priority',
    additionalInfo: 'Additional Information',
    Low: 'Low',
    High: 'High',
    No: 'No',
    Yes: 'Yes',
    N: 'N',
    Y: 'Y',
    a: 'a',
    isHazmat: 'isHazmat',
    null: 'null',
    orderLineId: 'orderLineId',
}

export const ApproveAccessorial = {
    header: 'Accessorial Details',
    status: 'Status:',
    dateOfFilling: 'Date of Filing',
    trackingNo: 'DFTS Tracking Number',
    billLading: 'Bill of Lading #',
    driverPOCName: 'Driver POC Name',
    driverPOCEmail: 'Driver POC Email/PhoneNo',
    VLOSCN: 'VLO#/SCN#',
    occurenceDate: 'Date of Occurrence',
    Comments: 'Comments',
    Attachments: 'Attachments',
    pendingApproval: 'Pending Approval',
    approved: 'Accessorial Approved',
    fromPage: 'accessorialDetail',
    accessorialGrid: 'accessorialGrid',
    attachmentGrid: 'attachmentGrid',
    approveMessage: 'By approving this record you certify that the listed services were needed, performed, and not requested in the initial EDI 219 offer.',
    entity: 'Approval Accessorial',
    accessorialStatusApprove: 'Approved',
    accessorialStatusReject: 'ACCL-Review Reject',
    reject: 'Accessorial Reject',
    addComments: 'Add Comments',
    seComment: 'Service Exception Comment',
    Accessorial: 'Accessorial',
    forOrder: "for Order",
    Approved: "was approved successfully.",
    notApproved: "was not approved.",
    Rejected: "was rejected successfully.",
    notRejected: "was not rejected.",
    accessorialCode: "Accessorial Code",
    orderNumber: "Order Number",
    yourComments: "Your comments has been submitted successfully"
}

export const AccessorialAdditionalInfo = {
    header: 'Additional Accessorial Information Needed',
    emailConfirmation: 'Email Confirmation',
    update: 'Updated or correct ACCL form',
    reweighCertificate: 'Reweigh Certificate',
    Pictures: 'Pictures',
    signBOL: 'Signed BOL in and out times',
    otherInfo: 'Other Information',
    serviceException: 'ServiceException',
    serviceExceptionComment: 'Service Exception Comment',
    other: 'other',
    accessorialStatus: 'ACCL-More Info Needed',
    atleastOne: 'At least one order must be selected',
    requestSubmitted: "Your request for additional information has been submitted."
}

export const LayoutConst = {
    layoutHome: 'Home',
    layoutAccessDocument: 'accessdocument',
    layoutadvancesearchdocument: 'advancesearchdocument',
    layoutSecureTrackorder: 'securetrackorder',
    layoutSearchandReport: 'searchandreport',
    layoutadvancesearchorder: 'advancesearchorder',
    layoutReportIncident: 'incidentgrid',
    layoutApproveAccessorial: 'approve-accessorials',
    layoutReportIncidentText: 'Report Incidents',
    layoutApproveAccessorialText: 'Approve Accessorials',
    layoutDashboard: 'dashboard',
    layoutRegistration: 'registration',
    layoutSubmitOrderText: 'Submit Orders',
    layoutSubmitOrderMainText: 'submitordermain',
    layoutBulkSearchText: 'bulksearch',
    layoutSubmitOrder: 'submitordergrid',
    UserPreference: 'userPreference',
    viewallnotifications: 'viewallnotifications',
    layoutNavigationEnd: 'NavigationEnd',
    userNotFound: 'USER NOT FOUND IN LOGX',
    userPedning: 'Pending',
    operation: 'VALIDATEUSER',
    regHeaderText: 'Thanks for registering!',
    resMsg: 'Registration',
    layoutApproveAccessorialDetails: 'approveaccessorialDetails',
    resFlag: true,
    resHeaderMsg: 'Your registration has been saved successfully. You will receive email updates to your registered email id.',
    registrationMsg: 'Thank you for registrating!, Your registration has been saved successfully. you will receive updates to your registered email id.',
    layoutNavValuesMob: [
            {
            "name": 'Reports',
            "icon": "reports",
            "routerLink": '/dashboard/reports'
        }
    ],
    reportNavValues: [{
        // "name": 'Documents',
        // "fullname": 'Reports - Documents',
        // "routerLink": '/dashboard/reports/documents',
        "name": 'Accessorials',
        "fullname": 'Reports - Accessorials',
        "routerLink": '/dashboard/reports/accessorials',
        "isfavVisible": "false",
    },
    {
        "name": 'Claims',
        "fullname": 'Reports - Claims',
        "routerLink": '/dashboard/reports/claims',
        "isfavVisible": "false",
    },
    {
        "name": 'Month End',
        "fullname": 'Reports - MonthEnd',
        "routerLink": '/dashboard/reports/monthend',
        "isfavVisible": "false",
    }, {
        "name": 'Inbound',
        "fullname": 'Reports - Inbound',
        "routerLink": '/dashboard/reports/inbound',
        "isfavVisible": "false",
    }, {
        "name": 'Incidents',
        "fullname": 'Reports - Incidents',
        "routerLink": '/dashboard/reports/incidents',
        "isfavVisible": "false",
    }, {
        "name": 'Outbound',
        "fullname": 'Reports - Outbound',
        "routerLink": '/dashboard/reports/outbound',
        "isfavVisible": "false",
    }
    ],
    reportRouteLink: '/dashboard/reports',

    layoutNavValues: [{
        "name": 'Home',
        "icon": "home",
        "routerLink": '/dashboard',
        "isfavVisible": "false"
    }, {
        "name": 'Track & Trace',
        "icon": "location_on",
        "routerLink": '/dashboard/securetrackorder',
        "isfavVisible": "false"
    }, {
        "name": 'Order Lookup',
        "icon": "search",
        "routerLink": '/dashboard/searchandreport',
        "isfavVisible": "false"
    },
    {
        "name": 'Access Documents',
        "icon": "library_books",
        "routerLink": '/dashboard/accessdocument',
        "isfavVisible": "false"
    },
    {
        "name": 'Approve Accessorials',
        "icon": "assignment_turned_in",
        "routerLink": '/dashboard/approve-accessorials',
        "isfavVisible": "false"
    },
    {
        "name": 'Report Incidents',
        "icon": "edit",
        "routerLink": '/dashboard/incidentgrid',
        "isfavVisible": "false"
    },
    {
        "name": 'Submit Orders',
        "icon": "format_indent_increase",
        "routerLink": '/dashboard/submitordergrid',
        "isfavVisible": "false"
    },

        {
            "name": 'Reports',
            "icon": "reports",
            "routerLink": '/dashboard/reports',
            "isfavVisible": "false"
        },
        //Below kept for future purpose 
        // {
        //   "name": 'Approve Orders',
        //   "icon": "grading",
        //   "routerLink": '/dashboard',
        //   "isfavVisible":"false"
        // }
    ]
}

export const AccessorialApprovalGrid = {
    header: 'Accessorials Pending Approval',
    pendingApproval: '1 pending approval from last 3 weeks',
    TotalRecords: 'Total Records:'
}


export const ReportIncidentDisplayRecord = {
    header: 'Incident',
    Attachments: 'Attachments',
    ordercontactnumber: 'Order Contact Number'
}

export const globalTrackTrace = {
    Status: 'Status',
    orderNum: 'Order Number',
    pickUpDate: 'Pick Up Date',
    deliveryDate: 'Delivery Date'
}

export const BulkSearchConst = {
    heading: 'Bulk Search',
    searchBy: 'Search By',
    inputText: 'Enter one per line or comma separated (,).',
    placeHolder: 'Enter or copy/paste here',
    track: 'Track',
    searchValue: ['PRO#', 'Order#', 'Load#', 'GBOL#', 'BOL#', 'TCN#', 'PO#', 'VLO#'],
    noRecord: 'Not records found for your search.',
    resultHeading: 'Bulk Search Result',
    displayedColumns: ['orderNumber', 'firstTCN', 'originLocation', 'deliveryLocation', 'pickUpDate', 'aDeliveryDate'],
    selected: 'Order#',
    total: 'Total Records:'
}

export const MobileLogin = {
    loginText: 'To login, please launch desktop version.'
}

export const customizeGridConstant = {
    reportFilter: 'ReportingFilter',
    indentifyingNumber: 'Identifying Numbers',
    financial: 'Financial',
    otherInfo: 'Other Info',
    transitInfo: 'Transit Dates/info',
    destinationInfo: 'Destination Info',
    originInfo: 'Origin Info',
    btnCancel: "Cancel",
    btnApply: "Apply"
}

export const HasPermissionConst = {
    noPermission: "Sorry you don't have permission to view"
}

export const SubmitorderdetailsConst = {
    Timezone: "Timezone",
    carrier: "Carrier",
    matCarrierTooltip: "Type atleast 3 characters of the carrier name, prefix with $ to search by SCAC and prefix with # to search by MC number.",
    matTooltipHideDelay: "100000",
    header: "EDIT ADDRESS",
    placeHolder: {
        carrier: "Carrier name or SCAC or MC#",
        tcn: "17 digits & only letters, no., $.",
        contact: "Contact Name",
        Phone: "Contact Number",
        Email: "abc@crowley.com",
        Timezone: "Select Timezone",
        date: "mm/dd/yyyy",
        selectOption: "Select an Option",
        selectType: "Select Type",
        ref: "Enter reference number",
        Length: "Length",
        Width: "Width",
        Height: "Height",
        Inch: "Please select UOM",
        comment: "Write comments here..."

    },
    SaveAndContinueErrorMessage: {

        notificationDelete: "Are you sure you want to save this address as default address?",
        saveDetails: "Are you sure you want to save and continue?"

    },
    ReferenceNumberErrorMessage: {
        notificationDelete: "Are you sure you want to delete this reference number?",
    },
    ListItems: {
        originInfolistIem: "ORIGIN INFORMATION",
        destinationInfolistItem: "DESTINATION INFORMATION",
        orderDetailslistItem: "ORDER DETAILS",
        orderLineItems: "ORDER LINE ITEMS",
        additionalInfo: "ADDITIONAL INFORMATION"
    },
    AdditionalinfoErrorMessage: {
        deleteorder: "Are you sure you want to cancel this Order?"
    },
    lineitemheader: 'List of Order Line Items',
    lineitemTotalCount: 'Total Line Items',
    orderLineItemGrid: 'orderLineItemGrid',
    draftOrders: 'Draft Orders',
    newOrders: 'New Order',
    widget: 'widget',
    draftOrderGrid: 'draftOrderGrid',
    orderLineItem: 'Order Line Item',
    grossWeight: 'Gross Weight',
    grossWeightRequired: 'Gross weight required',
    grossVolumeRequired: 'Gross volume required',
    lengthRequired: 'Length required',
    widthRequired: 'Width required',
    heightRequired: 'Height required',
    grossVol: 'Gross Volume',
    huCount: 'HU Count',
    huType: 'HU Type',
    pieceCount: 'Piece Count',
    pieceCountRequired: 'Piece count required',
    pieceType: 'Piece Type',
    pieceTypeRequired: 'Piece type required',
    freightClass: 'Freight Class',
    frieghtClassType: 'Freight class required',
    TCN: 'TCN',
    tcnRequired: 'TCN is required',
    tcnLength: 'TCN length should be 17',
    Length: 'Length',
    Width: 'Width',
    Height: 'Height',
    Hazmat: 'Hazmat',
    unClass: 'UN Class',
    unClassRequired: 'UN class required',
    hazmatClass: 'Hazmat Class',
    hazmatClassRequired: 'Hazmat class required',
    hazmatContactNumber: 'Hazmat Contact Number',
    hazmatNumberRequired: 'Hazmat contact number required',
    packingGroup: 'Packing Group',
    packingGroupRequired: 'Packing group required',
    description: 'Description',
    addMoreItems: 'Add More Items',
    addAnotherReferenceNumber: 'Add Another Reference Number',
    addReferenceNumber: 'Add Reference Number',
    cancel: 'Cancel',
    saveLater: 'Save For Later',
    saveContinue: 'Save & Continue',
    alreadyExists: 'This value already exists.',
    saveAndContinue: 'Complete',
    unsuccessful: 'Could not save the information. Please try again!',
    successful: 'Your Order number (order number) has been saved but not submitted.',
    originInfo: 'Origin Information',
    originLoc: 'Origin Location',
    saveDefault: 'Save as default address',
    Contact: 'Contact',
    Phone: 'Phone',
    Email: 'Email',
    earlyPickup: 'Early Pickup',
    latePickUp: 'Late Pickup',
    earlyDelivery: 'Early Delivery ',
    lateDelivery: 'Late Delivery ',
    addtofav: "Add to your favorites",
    destInfo: "Destination Information",
    destLoc: "Destination Location",
    cancelOrder: "Do you want to cancel this order?",
    cancelOrderSingle: "Your order was cancelled successfully.",
    cancelOrderShipWith: "Your order was cancelled successfully. All linked orders remain active.",
    saveAddress: "Are you sure you want to save address as favorite?",
    failSaveAdress: "You can save only 2 addresses you have to delete one from preference screen.",
    newLocationTooltip: "Enter Location information to search or enter the full address to create a new location.",
    addToFavoritesToolTip: "You can save only 2 addresses.You have to delete any one address from the above adress.",
    useAdress: 'Use This Address',//////
    Dimensions: 'Dimension'
}

export const ExportGridDataConst = {
    exportTitle: 'Export',
    visibleColumns: 'Visible Columns',
    allColumns: 'All Columns'
}

export const UserPreferenceConst = {

    user_userEmail: 'testmfa@crowley.com',
    UserPreferenceForm: "UserPreferenceForm",
    twelveHours: "12 Hour (AM/PM)",
    twentyFourHours: "24 Hour",
    addaddress: "Add Address",
    confirmDeletion: "Confirm Deletion",
    paginationmsg: "Search result pages only",
    deleteSuccess: "This address has been removed from your list of favorites.",
    preferenceSuccess: "User Preference was saved successfully",
    preferenceLocationExists: "You have selected same location previosly, kindly enter different location",
    preferenceFailure: "Falied to save User preferences",
    deleteFailure: "Failed to delete User Preference",
    deletewarningNote: "Please note:",
    deletewarning: "Deleting this address only removes it from your favorites list. The address record and related order records will not be changed.",
    AllDays: "all days",
    parameters: {
        languageSearch: "language",
        paginationSearch: "pagination",
        favoritemenuSearch: "favoritemenu",
        notification_groupSearch: "notification_group",
        notification_group_valueSearch: "notification_group_value",
        timezoneSearch: "Timezone",
        dateformatSearch: "dateformat",
        addressSearch: "address",
        densitySearch: "density",
        areaSearch: "area",
        dimensionSearch: "dimension",
        distanceSearch: "distance",
        temperatureSearch: "temperature",
        volumeSearch: "volume",
        weightSearch: "weight",

    },
    placeHolder: {
        chooseOption: "Choose an option",
        selectfavoritemenu: "Select Favorite menu",
    }

}





export const EditOrderNumberConst = {
    saveMessage: "Are you sure want to save this change?"

}

export const RegistrationConst = {
    militaryRank: 'Military Rank',
    civilServiceGrade: 'Civil Service Grade',
    service_Command: 'Service/Command',
}