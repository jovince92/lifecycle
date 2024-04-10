import Layout from '@/Layouts/Layout';
import { LifeCycle, Program } from '@/types';
import { Head, Link } from '@inertiajs/inertia-react';
import {FC, useState} from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select';
import ProgramContent from './ProgramComponents/ProgramContent';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/Components/ui/breadcrumb';
import Hint from '@/Components/Hint';
import { Button } from '@/Components/ui/button';
import { ListTodo } from 'lucide-react';
import CheckList from './ProgramComponents/CheckList';
import TRDNotificationModal from './ProgramComponents/TRDNotificationModal';

const Cycles:LifeCycle[] = [
    'Business Requirements Document' ,
    'Technical Requirements Document' ,
    'Setup Schedule' ,
    'Test Plan',
    'Requirement Traceability Matrix'
];

interface Props {
    program:Program;
}


const Program:FC<Props> = ({program}) => {
    const {project} = program;
    const [currentLifeCycle,setCurrentLifeCycle] = useState<LifeCycle>(Cycles[0]);
    return (
        <>
            <Head title={program.name} />
            <Layout selected_project={project} >
                <div className='px-3.5 pb-1.5 w-full  h-full flex flex-col gap-y-3.5 '>
                    <div className='flex flex-col md:flex-row items-center md:justify-between h-auto'>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href={route('dashboard')}>
                                            Home
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href={route('projects.show',{id:program.project_id})}>
                                            {program.project.name}
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href={route('programs.show',{id:program.id})}>
                                            {program.name}
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <Select value={currentLifeCycle} onValueChange={(e:LifeCycle)=>setCurrentLifeCycle(e)} >
                                    <SelectTrigger className='h-9 inline-flex w-auto !ring-0 !ring-offset-0 border-0'>
                                        <SelectValue placeholder={currentLifeCycle} />
                                    </SelectTrigger>
                                    <SelectContent  >
                                        {
                                            Cycles.map((cycle)=><SelectItem key={cycle} value={cycle} >{cycle}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <CheckList program={program} />                        
                    </div>
                    <div className='flex-1 overflow-y-hidden'>
                        <ProgramContent program={program} cycle={currentLifeCycle} />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Program;
