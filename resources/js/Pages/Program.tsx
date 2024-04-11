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
import TRDNotificationModal from './ProgramComponents/TechnicalRequirementsDocument/TRDNotificationModal';
import { useLocalStorage } from 'usehooks-ts';
import SetupSchedule from './ProgramComponents/SetupSchedule';
import SetupScheduleEmail from './ProgramComponents/SetupScheduleEmail';
import { useProgramModal } from '@/Hooks/useProgramModal';
import TestPlanEmail from './ProgramComponents/TestPlanEmail';
import FailedTestEmail from './ProgramComponents/FailedTestEmail';
import CompletedTestEmail from './ProgramComponents/CompletedTestEmail';
import TestCasesPassedEmail from './ProgramComponents/TestCasesPassedEmail';

const Cycles:LifeCycle[] = [
    'Business Requirements Document' ,
    'Technical Requirements Document' ,
    'Setup Schedule' ,
    'Send an email of the schedule',
    'Test Plan',
    'Send an email of the Test Plan',
    'Send an email to inform of failed test',
    'Send an email to inform of completed test',
    'Requirement Traceability Matrix',
    'Send an email to Software manager informing all test cases are passed'
];

interface Props {
    program:Program;
}


const Program:FC<Props> = ({program}) => {
    const {project} = program;
    const [currentLifeCycle,setCurrentLifeCycle] = useLocalStorage<LifeCycle>( program.id.toString(), Cycles[0]);
    const [showSetupSchedule,setShowSetupSchedule] = useState(false);
    const [showSetupScheduleEmail,setShowSetupScheduleEmail] = useState(false);
    const [showTestPlanEmail,setShowTestPlanEmail] = useState(false);
    const [showFailedTestEmail,setShowFailedTestEmail] = useState(false);
    const [showCompletedTestEmail,setShowCompletedTestEmail] = useState(false);
    const [showSoftwareManagerEmail,setShowSoftwareManagerEmail] = useState(false);
    
    const {onOpen} = useProgramModal();
    const handleSelect = (e:LifeCycle) =>{
        if(e==='Business Requirements Document'){
            setCurrentLifeCycle(e);
        }
        if(e==='Technical Requirements Document'){
            setCurrentLifeCycle(e);
        }
        if(e==='Setup Schedule') {
            setShowSetupSchedule(true);
        }
        if(e==='Send an email of the schedule'){
            setShowSetupScheduleEmail(true);
        }
        if(e==='Test Plan'){
            onOpen(program.project_id,program);
        }
        if(e==='Send an email of the Test Plan'){
            setShowTestPlanEmail(true);
        }
        if(e==='Send an email to inform of failed test'){
            setShowFailedTestEmail(true);
        }
        if(e==='Send an email to inform of completed test'){
            setShowCompletedTestEmail(true);
        }
        if(e==='Requirement Traceability Matrix'){
            setCurrentLifeCycle(e);
        }
        if(e==='Send an email to Software manager informing all test cases are passed'){
            setShowSoftwareManagerEmail(true);
        }
        
    }

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
                                <Select value={currentLifeCycle} onValueChange={(e:LifeCycle)=>handleSelect(e)} >
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
            <SetupSchedule program={program} isOpen={showSetupSchedule} onClose={()=>setShowSetupSchedule(false)} />
            {!!program.program_setup_schedule &&<SetupScheduleEmail program={program} isOpen={showSetupScheduleEmail} onClose={()=>setShowSetupScheduleEmail(false)} />}
            <TestPlanEmail program={program} isOpen={showTestPlanEmail} onClose={()=>setShowTestPlanEmail(false)} />
            <FailedTestEmail program={program} isOpen={showFailedTestEmail} onClose={()=>setShowFailedTestEmail(false)} />
            <CompletedTestEmail program={program} isOpen={showCompletedTestEmail} onClose={()=>setShowCompletedTestEmail(false)} />
            <TestCasesPassedEmail program={program} isOpen={showSoftwareManagerEmail} onClose={()=>setShowSoftwareManagerEmail(false)} />
        </>
    );
};

export default Program;
