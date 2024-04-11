import TipTap from '@/Components/TipTap';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Popover, PopoverTrigger } from '@/Components/ui/popover';
import { Separator } from '@/Components/ui/separator';
import useEditorConfig from '@/Hooks/useEditorConfig';
import { cn } from '@/lib/utils';
import { Program, User } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Ban, Loader2, MailPlus, Send, XCircle } from 'lucide-react';
import {FC, MouseEventHandler, useEffect,  useState} from 'react';
import { toast } from 'sonner';

interface Props {
    isOpen:boolean;
    onClose:()=>void;
    program:Program;
}

const TRDNotificationModal:FC<Props> = ({isOpen,onClose,program}) => {    
    const [sending,setSending] = useState(false);    
    const [emailMsg,setEmailMsg] = useState("");   
    const [sJ,setSj] = useState("");
    const {editor} = useEditorConfig();

    useEffect(()=>{
        setEmailMsg(generateEmail(program));
        setSj(generateSubject(program));
    },[isOpen,program]);

    const onSubmit = () =>{
        if (!editor) return;

        if (editor.getHTML().length<25) return toast.info('Email Request Message is too short');
        if (!sJ||sJ.length<20) return toast.info('Subject Line is too short');
        const notif = toast.loading("Sending Email. Please do not close this page...");
        Inertia.post(route('programs.trd_notif'),{
            subject:sJ,
            body:editor.getHTML(),
            //@ts-ignore
            emails:program.program_testers,
            program_id:program.id
        },{
            onStart:()=>setSending(true),
            onError:()=> toast.error('An error occurred. Please try again later.',{id:notif}),
            onSuccess:()=>{
                toast.success('Email Sent Successfully',{id:notif});
                onClose();
            },
            onFinish:()=>setSending(false)
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='max-w-[90vw] max-h-[95vh] h-full flex flex-col space-x-1.5'>
                <div className='w-full flex flex-col space-y-1.5'>
                    <p className='font-semibold text-lg'>TRD Notification</p>
                    <Separator />
                    <div className='flex space-x-1.5 items-center justify-end'>
                        <Label htmlFor='subject' className=''>Subject:</Label>
                        <Input disabled={sending} id='subject' value={sJ} onChange={e=>setSj(e.target.value)}  className='flex-1' />
                    </div>
                    <div className='flex space-x-1.5 items-center justify-end'>
                        <Label htmlFor='to' className=''>To:</Label>
                        <div className='flex-1 flex items-center flex-wrap min-h-[2.75rem] p-2 rounded-md bg-background border border-muted gap-1.5'>
                            {
                                program.program_testers.map(address=><ToItem key={address.id} to={address} onRemove={()=>{}} />)
                            }
                        </div>
                    </div>
                    <div className='flex space-x-1.5 items-center justify-end'>
                        <Label htmlFor='to' className=''>CC:</Label>
                        <div className='flex-1 flex items-center flex-wrap min-h-[2.75rem] p-2 rounded-md bg-background border border-muted gap-1.5'>
                            {
                                ([...program.program_programmers,...program.project.project_coordinators]).map(address=><ToItem key={address.id} to={address} onRemove={()=>{}} />)
                            }
                        </div>
                    </div>
                    <Separator />
                </div>
                <div className={cn('w-full flex-1 flex flex-col max-h-fit overflow-y-auto',sending?'opacity-50':'opacity-100')}>
                    <TipTap editor={editor!} content={emailMsg} />
                </div>
                <div className='flex items-center justify-end space-x-1.5'>
                    <Button disabled={sending} variant='secondary' size='sm' className='text-base flex items-center space-x-1.5'>
                        <Ban className='w-4 h-4' />
                        <span>Cancel</span>
                    </Button>
                    <Button disabled={sending} onClick={onSubmit} variant='outline' size='sm' className='text-base flex items-center space-x-1.5'>
                        {!sending?<Send className='w-4 h-4' />:<Loader2 className='h-4 w-4 animate-spin' />}
                        <span>Send Notification</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TRDNotificationModal;


interface ToItemProps{
    onRemove:(user:User)=>void;
    to:User ;
}

export const ToItem:FC<ToItemProps> = ({onRemove,to}) =>{
    
    // const handleRemove:MouseEventHandler = (e) =>{
    //     e.stopPropagation();
    //     onRemove(to);
    // }


    return(
        <Button variant='secondary' className='!cursor-default relative group' size='sm'>
            {/* <XCircle onClick={handleRemove} className='opacity-30 group-hover:opacity-100 transition duration-300 cursor-pointer text-destructive h-4 w-4 absolute top-0 right-0' /> */}
            <span>{`${to.first_name} ${to.last_name||''}`}</span>
        </Button>
    );
}


const generateEmail = (program:Program):string=>{
    if(!program) return "";
    const {business_requirement_document} = program;
    const {items} = business_requirement_document;
    let itemContents = items.reduce((prev,item)=>prev+`
    <tr>
        <td>${item.id.toString()}</td>
        <td>${item.module}</td>
        <td>${item.applicable_roles}</td>
        <td>${item.description}</td>
    </tr>
    `,"");

    // itemContents=itemContents+`
    //     <tr>
    //         <td colspan="4">
    //         <td colspan="2">
    //             <strong>Grand Total</strong>
    //         </td>
    //         <td>
    //             <strong> ${new Intl.NumberFormat().format(quotation.grand_total).toString()}</strong>
    //         </td>
    //     </tr>
    // `;

    return `

    
    Hi Testers,
    <br>
    <br>
    Create Technical Requirements Document Notification.
    <br>
    <br>
    Project:&nbsp;<strong>${program.project.name} - ${program.name}</strong><br>
    
    <table>
        <thead>
            <tr align='center'>
                <th>BR#</th>
                <th>Module/Field</th>
                <th>Applicable Roles</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            ${itemContents}
        </tbody>
    </table>
    <br><br>
    Please create a Technical Requirement Document based on the Business Requirements above.
    <br><br>
    Thanks.
    <br><b></b><br>
    
    
    `;
}


const generateSubject = (program:Program):string =>{
    if(!program) return "";
    const title = `${program.project.name} - ${program.name}`
    return `Create TRD - ${title}`
}
