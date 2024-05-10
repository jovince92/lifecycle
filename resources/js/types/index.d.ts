
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
    software_manager:User;
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
    change_requests:ChangeManagementRequest[];


    program_programmers:User[];
    program_testers:User[];

    business_requirement_document:BusinessRequirementsDocument;
    techinical_requirement_document:TechnicalRequirementsDocument;
    program_setup_schedule:ProgramSetupSchedule;

    user_acceptances:UserAcceptance[]
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
    histories:TrdHistory[];
}

export interface TechnicalRequirementsDocumentItem {
    id:number;
    teq_req_doc_id:number;
    req_description:string;
    test_case_id:string;
    test_case_description:string;
    test_case_remarks:string;
    test_case_status:'ongoing'|'success'|'failed';    
}

export interface ProgramSetupSchedule extends TimeStamps{
    id:number;
    program_id:number;
    date:string;
}

export interface TrdHistory extends TimeStamps{
    id:number;
    teq_req_doc_id:number;
    teq_req_doc_item_id:number;
    user_id:number;
    test_case_status:'ongoing'|'success'|'failed';

    user:User;
    teq_req_doc:TechnicalRequirementsDocument;
    teq_req_doc_item?:TechnicalRequirementsDocumentItem;
}

export interface UserAcceptance extends TimeStamps{
    id:number;
    program_id:number;
    user_id:number;
    responsible: UAResponsible;
    items:UserAcceptanceItem[];
    program:Program;
    remarks:string;
    user:User;
}

export interface UserAcceptanceItem extends TimeStamps{
    id:number;
    user_acceptance_id:number;
    description:string;
    status:0|1;
    is_additional:1|0;
}

export interface ChangeManagementRequest extends TimeStamps{
    /*
    $table->id();
            $table->unsignedBigInteger('program_id')->index();
            $table->unsignedBigInteger('user_id')->index();
            $table->string('title');
            $table->text('description');
            $table->tinyInteger('client_request')->default(0);
            $table->tinyInteger('incident_or_problem_resolution')->default(0);            
            $table->tinyInteger('enhancement')->default(0);            
            $table->tinyInteger('business_requirement')->default(0);            
            $table->tinyInteger('procedural')->default(0);
                        
            $table->tinyInteger('others')->default(0);
            $table->string('others_description')->nullable();
            $table->date('schedule')->nullable();

            $table->string('hardware')->nullable();
            $table->string('software')->nullable();
            $table->string('manpower')->nullable();
            $table->string('location')->nullable();
            $table->string('office_equipment')->nullable();
            $table->string('other')->nullable();
            
            $table->string('risk_impact_analysis_people')->nullable();
            $table->string('risk_impact_analysis_affected_system')->nullable();
            $table->string('risk_impact_analysis_schedule')->nullable();
            $table->string('risk_impact_analysis_equipment')->nullable();
            $table->string('risk_impact_analysis_overall_impact')->nullable();

            $table->string('rollback_plan')->nullable();
            
            $table->tinyInteger('review_result')->nullable();
            $table->string('reason')->nullable();
            $table->unsignedBigInteger('head_id')->nullable();
            $table->date('review_date')->nullable();
            
            $table->text('completion_details')->nullable();
            $table->dateTime('actual_start')->nullable();
            $table->dateTime('actual_end')->nullable();
            $table->string('total_actual_duration')->nullable();
            $table->text('remarks')->nullable();
            $table->unsignedBigInteger('completed_by_id')->nullable();
            
            $table->date('completed_by_date')->nullable();

            $table->unsignedBigInteger('noted_by_id')->nullable();
            $table->date('noted_by_date')->nullable();
            
            $table->timestamps();

            $table->foreign('program_id')->references('id')->on('programs')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('head_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('completed_by_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('noted_by_id')->references('id')->on('users')->onDelete('cascade');
    */
    id:number;
    program_id:number;
    user_id:number;
    title:string;
    description:string;
    client_request:0|1;
    incident_or_problem_resolution:0|1;
    enhancement:0|1;
    business_requirement:0|1;
    procedural:0|1;
    others:0|1;
    others_description?:string;
    schedule?:string;
    hardware?:string;
    software?:string;
    manpower?:string;
    location?:string;
    office_equipment?:string;
    other?:string
    risk_impact_analysis_people?:string;
    risk_impact_analysis_affected_system?:string;
    risk_impact_analysis_schedule?:string;
    risk_impact_analysis_equipment?:string;
    risk_impact_analysis_overall_impact?:'low'|'medium'|'high';
    rollback_plan?:string;
    review_result?:1|2|3;
    reason?:string;
    head_id?:number;
    review_date?:string;
    completion_details?:string;
    actual_start?:string;
    actual_end?:string;
    total_actual_duration?:string;
    remarks?:string;
    completed_by_id?:number;
    completed_by_date?:string;
    noted_by_id?:number;
    noted_by_date?:string;
    program:Program;
    user:User;
    head?:User;
    completed_by?:User;
    noted_by?:User;

}

export type UAResponsible = 'it'|'pc'|'prod';


export type LifeCycle =
    'Business Requirements Document' |
    'Technical Requirements Document' |
    'Setup Schedule' |
    'Test Plan'|
    'Requirement Traceability Matrix'|
    'Send an email of the schedule'|
    'Send an email of the Test Plan'|
    'Send an email to inform of failed test'|
    'Send an email to inform of completed test'|
    'Send an email to Software manager informing all test cases are passed'|
    'User Acceptance Testing'|
    'Change Management Request';
