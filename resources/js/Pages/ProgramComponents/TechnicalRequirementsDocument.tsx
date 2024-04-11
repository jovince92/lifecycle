import { Button } from '@/Components/ui/button';
import { Program, TechnicalRequirementsDocumentItem } from '@/types';
import {FC, useState} from 'react';
import TeqReqModal from './TechnicalRequirementsDocument/TeqReqModal';
import { format } from 'date-fns';
import { Separator } from '@/Components/ui/separator';
import { FilePlus, MailPlus, MoreHorizontal, MoreVertical, PencilLine,  } from 'lucide-react';
import { TableBody, TableCell, TableHead, TableHeader, TableRow,Table } from '@/Components/ui/table';
import TeqReqItemModal from './TechnicalRequirementsDocument/TeqReqItemModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Inertia } from '@inertiajs/inertia';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import NotifySetUpCommiteeModal from './BusinessRequirementsDocument/NotifySetUpCommiteeModal';
import { Badge } from '@/Components/ui/badge';

interface Props {
    program:Program;
}

const TechnicalRequirementsDocument:FC<Props> = ({program}) => {
    const [showNewTechnicalRequirementsDocument,setShowNewTechnicalRequirementsDocument] = useState(false);
    const [showNewTechnicalRequirementsItem,setShowNewTechnicalRequirementsItem] = useState(false);
    const [showNotifySetUpCommitee,setShowNotifySetUpCommitee] = useState(false);

    const handleNotifySetUpCommitee = () =>{
        if(!program.techinical_requirement_document) return;
        if(program.techinical_requirement_document.items.length<1) return toast.error('Cannot notify Setup Commitee. No TRD Items found');
        setShowNotifySetUpCommitee(true);
    }

    return (
        <>
            <div className='w-full h-full border rounded-lg flex items-center justify-center'>
                {
                    !program.techinical_requirement_document ?(
                        <div className='flex flex-col gap-y-5'>
                            <h3 className='text-lg !font-bold'>
                                No Technical Requirements Document
                            </h3>
                            <Button onClick={()=>setShowNewTechnicalRequirementsDocument(true)}>
                                Create Technical Requirements Document
                            </Button>
                        </div>
                    ):(
                        <>
                            <div className='h-full container mx-auto px-5 py-2.5 flex flex-col gap-y-0.5'>
                                <div className='h-auto flex items-center justify-between gap-x-2'>
                                    <p className='flex-1 font-semibold text-lg tracking-wide'>
                                        Technical Requirements Document
                                    </p>
                                    <div className='flex items-center gap-x-3.5 text-sm'>
                                        <div className='flex flex-col gap-y-1.5'>
                                            <div className='flex items-center justify-between'>
                                                <p>
                                                    TRD No.
                                                </p>
                                                <p>
                                                    {program.techinical_requirement_document.id}
                                                </p>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <p>
                                                    Date:
                                                </p>
                                                <p>
                                                    {format(new Date(program.techinical_requirement_document.created_at),'PP')}
                                                </p>
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>                                                
                                                <Button size='icon' className='rounded-full' variant='ghost'>
                                                    <MoreVertical />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side='left'>
                                                <DropdownMenuLabel>Options</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={()=>setShowNewTechnicalRequirementsItem(true)}>
                                                    <FilePlus className='h-4 w-4 mr-2' />
                                                    New TRD Item
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={()=>setShowNewTechnicalRequirementsDocument(true)}>
                                                    <PencilLine className='h-4 w-4 mr-2' />
                                                    Update TRD
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={handleNotifySetUpCommitee}>
                                                    <MailPlus className='h-4 w-4 mr-2' />
                                                    Notify Setup Committtee
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                
                                <Separator />
                                <div className='py-3.5 flex flex-col gap-y-1.5 text-sm h-auto'>
                                    <div className='flex items-center justify-between gap-x-2'>
                                        <div className='w-1/2 flex items-center justify-between'>
                                            <p className='text-muted-foreground'>Client Name</p>
                                            <p>{program.project.client_name}</p>
                                        </div>
                                        <div className='w-1/2 flex items-center justify-between'>
                                            <p className='text-muted-foreground'>Program Name</p>
                                            <p>{program.name}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between gap-x-2'>
                                        <div className='w-1/2 flex items-center justify-between'>
                                            <p className='text-muted-foreground'>Accuracy</p>
                                            <p>{program.techinical_requirement_document.accuracy}</p>
                                        </div>
                                        <div className='w-1/2 flex items-center justify-between'>
                                            <p className='text-muted-foreground'>Output Format</p>
                                            <p>{program.techinical_requirement_document.output_format}</p>
                                        </div>
                                    </div>                       
                                </div>
                                <Table className='flex-1'>
                                    <TableHeader className='!border-2 sticky top-0 bg-background z-50'>
                                        <TableRow>                                
                                            <TableHead className='!border !font-light'>
                                                Req ID
                                            </TableHead>
                                            <TableHead className='!border !font-light'>
                                                Req. Description
                                            </TableHead>
                                            <TableHead className='!border !font-light'>
                                                Test Case ID
                                            </TableHead>
                                            <TableHead className='!border !font-light'>
                                                Test Description
                                            </TableHead>
                                            <TableHead className='!border !font-light'>
                                                Test Remarks
                                            </TableHead>
                                            <TableHead className='!border !font-light'>
                                                Test Status
                                            </TableHead>
                                            <TableHead className='!border !font-light'>
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                        
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            program.techinical_requirement_document.items.map((item)=><TRQItem key={item.id} item={item} />)
                                        }
                                    </TableBody>
                                </Table>
                            </div>
                        </>
                    )
                }
            </div>
            <TeqReqModal program={program} isOpen={showNewTechnicalRequirementsDocument} onClose={()=>setShowNewTechnicalRequirementsDocument(false)} />
            {!!program.techinical_requirement_document && <TeqReqItemModal teq_req_id={program.techinical_requirement_document.id} isOpen={showNewTechnicalRequirementsItem} onClose={()=>setShowNewTechnicalRequirementsItem(false)} />}
            {!!program.techinical_requirement_document && <NotifySetUpCommiteeModal program={program} isOpen={showNotifySetUpCommitee} onClose={()=>setShowNotifySetUpCommitee(false)} />}
        </>
    );
};

export default TechnicalRequirementsDocument;

interface TRQItemProps{
    item: TechnicalRequirementsDocumentItem;
}

const TRQItem:FC<TRQItemProps> = ({item}) =>{
    const [showModal,setShowModal] = useState(false);
    const [deleting,setDeleting] = useState(false);

    const onDelete=()=>{
        Inertia.post(route('tech_requirement.item.destroy',{id:item.id}),{},{
            onStart:()=>setDeleting(true),
            onSuccess:()=>setDeleting(false),
            onError:()=>toast.error('Failed to delete Technical Requirements Document Item. Try again')
        })
    }
    
    return (
        <>
            <TableRow className={cn(deleting&&'!animate-pulse')}>
                <TableCell className='!border'>{item.id}</TableCell>
                <TableCell className='!border'>{item.req_description}</TableCell>
                <TableCell className='!border'>{item.test_case_id}</TableCell>
                <TableCell className='!border'>{item.test_case_description}</TableCell>
                <TableCell className='!border'>{item.test_case_remarks}</TableCell>
                <TableCell className='!border'>
                    {item.test_case_status==='failed' && <Badge variant='destructive'>Failed</Badge>}
                    {item.test_case_status==='ongoing' && <Badge variant='outline'>On-Going</Badge>}
                    {item.test_case_status==='success' && <Badge variant='default'>Success</Badge>}
                </TableCell>
                <TableCell className='!border'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>                        
                            <Button disabled={deleting} variant='ghost'>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={()=>setShowModal(true)}>Update</DropdownMenuItem>
                            <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            <TeqReqItemModal teq_req_id={item.teq_req_doc_id} teqReqItem={item} isOpen={showModal} onClose={()=>setShowModal(false)} />
        </>
    );
}