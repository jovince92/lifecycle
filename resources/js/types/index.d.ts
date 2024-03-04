
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
    role:'Admin'|'Student'|'Instructor'
}
export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    
};




declare global {
    var route: typeof ziggy;
}

export interface Project extends TimeStamps{
    
    id: number;
    user_id: number;
    name: string;
    client_name?: string;
    date_prepared?: string;
    department?: string;
    scope_of_testing?: string;
    test_strategy?: string;
    testing_schedule?: string;
    resources_needed?: string;
    system_deadline?: string;
    user: User;
    project_coordinators:User[];
    project_programmers:User[];
}
