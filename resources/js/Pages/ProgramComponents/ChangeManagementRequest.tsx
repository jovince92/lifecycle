import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { ChangeManagementRequest, Program } from '@/types';
import {FC, useState} from 'react';
import { format } from 'date-fns';
import Hint from '@/Components/Hint';
import { MailWarning, Pencil, Trash2 } from 'lucide-react';
import NewCrModal from './ChangeManagementRequest/NewCrModal';

interface Props {
    program:Program;
}

const ChangeManagementRequest:FC<Props> = ({program}) => {
    const [showNewCr,setShowNewCr] = useState(false);
    const {change_requests} = program;
    return (
        <>
            <div className='w-full h-full border rounded-lg flex flex-col gap-y-2.5 p-2.5'>
                <Button onClick={()=>setShowNewCr(true)} size='sm' className='ml-auto'>
                    Add Change Request
                </Button>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Proposed By</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Date Created</TableHead>
                            <TableHead>Schedule</TableHead>
                            <TableHead>Source of Change Request</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        
                    </TableBody>
                </Table>
            </div>
            <NewCrModal program={program} open={showNewCr} onClose={()=>setShowNewCr(false)} />
        </>
    );
};

export default ChangeManagementRequest;

interface ChangeRequestItemProps{
    cr:ChangeManagementRequest;
    onEdit:(cr:ChangeManagementRequest)=>void;
    onDelete:(cr:ChangeManagementRequest)=>void;
    onNotify:(cr:ChangeManagementRequest)=>void;
}

const ChangeRequestItem:FC<ChangeRequestItemProps> = ({cr,onEdit,onDelete,onNotify}) =>{
    const {user} = cr;
    const fullName = `${user.first_name} ${user.last_name}`;

    const source = () =>{
        if(cr.client_request===1) return 'Client Request';
        if(cr.incident_or_problem_resolution===1) return 'Incident or Problem Resolution';
        if(cr.enhancement===1) return 'Enhancement';
        if(cr.business_requirement===1) return 'Business Requirement';
        if(cr.procedural===1) return 'Procedural';
        if(cr.others===1) return cr.others_description;
        return 'N/A'
    }

    return (
        <TableRow>
            <td>{fullName}</td>
            <td>{cr.title}</td>
            <td>{format(new Date(cr.created_at),'PPp')}</td>
            <td>{cr.schedule}</td>
            <td>{source()}</td>
            <td className='text-right'>
                <div className='flex items-center justify-end gap-x-2'>
                    <Hint label='Edit'>                        
                        <Button onClick={()=>onEdit(cr)} variant='outline' size='icon'>
                            <Pencil className='h-5 w-5' />
                        </Button>
                    </Hint>
                    <Hint label='TODO: Delete'>                        
                        <Button variant='destructive' size='icon'>
                            <Trash2 className='h-5 w-5' />
                        </Button>
                    </Hint>
                    
                    <Hint label='Notify Programmers'>                        
                        <Button onClick={()=>onNotify(cr)} variant='outline' size='icon'>
                            <MailWarning className='h-5 w-5' />
                        </Button>
                    </Hint>
                </div>
            </td>
        </TableRow>
    )
}