import Layout from '@/Layouts/Layout';
import { LifeCycle, Program } from '@/types';
import { Head, Link } from '@inertiajs/inertia-react';
import {FC, useState} from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select';
import ProgramContent from './ProgramComponents/ProgramContent';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/Components/ui/breadcrumb';

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
                <div className='px-3.5 pb-1.5 w-full  h-full flex flex-col gap-y-3.5 md:gap-y-0'>
                    <Breadcrumb className='h-auto'>
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
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className='flex flex-col md:flex-row items-center justify-center md:justify-between h-auto '>
                        <p className='py-2.5 font-bold tracking-wide text-xl'>{program.name}</p>
                        <div>
                            <Select value={currentLifeCycle} onValueChange={(e:LifeCycle)=>setCurrentLifeCycle(e)} >
                                <SelectTrigger>
                                    <SelectValue placeholder={currentLifeCycle} />
                                </SelectTrigger>
                                <SelectContent  >
                                    {
                                        Cycles.map((cycle)=><SelectItem key={cycle} value={cycle} >{cycle}</SelectItem>)
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className='flex-1'>
                        <ProgramContent program={program} cycle={currentLifeCycle} />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Program;
