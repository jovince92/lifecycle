
import ziggy from 'ziggy-js'

interface TimeStamps{
    created_at: string;
    updated_at: string;
}

export interface User {
    id: number;
    first_name:string;    
    last_name:string;
    company_id:string;
    email?:string;
    photo?:string;
    level: 0|1|2|3;
    department:string;
    position:string;
}
export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    projects: Project[];
    archives: Project[];
    departments: {
        id:number;
        name:string;
    }[];
    selected_program?: Program;
    users_with_no_email:User[];
    steps:Step[];
};




declare global {
    var route: typeof ziggy;
}

export interface Project extends TimeStamps{    
    id: number;
    user_id: number;
    name: string;
    client_name?: string;
    user: User;
    project_coordinators:User[];
    is_archived:0|1;
    programs:Program[];
}

export interface Department {
    myDescription:string;
    myValue:string;
}

export interface Program extends TimeStamps{
    
    id: number;
    project_id: number;
    name: string;
    department: string;
    date_prepared?: string;
    scope_of_testing?: string;
    test_strategy?: string;
    testing_schedule?: string;
    resources_needed?: string;
    system_deadline?: string;
    project: Project;
    step_id:number;
    step:Step;

    program_programmers:User[];
    program_testers:User[];

    business_requirement_document:BusinessRequirementsDocument;
    techinical_requirement_document:TechnicalRequirementsDocument;
} 


export interface HrmsInfo{
    job_job_title : string;
    idno : string;
    last_name : string;
    first_name : string;
    picture_location? : string;
    department : string;
    work_email : string;
}

export interface Step{
    id:number;
    step:number;
    name:string;
}


export interface BusinessRequirementsDocument extends TimeStamps{
    id:number;
    program_id:number;
    user_id:number;
    volume:string;
    turnaround:string;
    accuracy:string;
    output_format:string;
    program:Program;
    user:User;
    items:BusinessRequirementsDocumentItem[];    
}

export interface BusinessRequirementsDocumentItem{
    id:number;
    bus_req_doc_id:number;
    guid:string;
    module:string;
    applicable_roles:string;
    description:string;
}

export interface TechnicalRequirementsDocument extends TimeStamps{
    id:number;
    program_id:number;
    accuracy:string;
    output_format:string;
    program:Program;
    items:TechnicalRequirementsDocumentItem[]; 
}

export interface TechnicalRequirementsDocumentItem {
    id:number;
    teq_req_doc_id:number;
    req_description:string;
    test_case_id:string;
    test_case_description:string;
    test_case_remarks:string;
    test_case_status:string;    
}


export type LifeCycle =
    'Business Requirements Document' |
    'Technical Requirements Document' |
    'Setup Schedule' |
    'Test Plan'|
    'Requirement Traceability Matrix'
;
