import { Dialog, DialogContent } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Separator } from '@/Components/ui/separator';
import useEditorConfig from '@/Hooks/useEditorConfig';
import { Program } from '@/types';
import {FC, useEffect, useState} from 'react';
import { ToItem } from './TechnicalRequirementsDocument/TRDNotificationModal';
import { format } from 'date-fns';
import TipTap from '@/Components/TipTap';
import { cn } from '@/lib/utils';
import { Button } from '@/Components/ui/button';
import { Ban, Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Inertia } from '@inertiajs/inertia';

interface Props {
    program:Program;
    isOpen:boolean;
    onClose:()=>void;
}

const SetupScheduleEmail:FC<Props> = ({program,isOpen,onClose}) => {
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
        Inertia.post(route('programs.setup_sched_reminder'),{
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
                    <p className='font-semibold text-lg'>Set Up Schedule</p>
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
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SetupScheduleEmail;


const generateEmail = (program:Program):string=>{
    if(!program) return "";


    return `

    
    Hi Set Up Commitee,
    <br>
    <br>
    Please be reminded that the Set Up Schedule for ${program.name} is: 
    <br>
    ${format(new Date(program.program_setup_schedule.date),'PPP')}
    <br>
    <br>
    Project:&nbsp;<strong>${program.project.name} - ${program.name}</strong><br>
    
    
    <br><br>
    Thanks.
    <br><b></b><br>
    
    
    `;
}


const generateSubject = (program:Program):string =>{
    if(!program) return "";
    const title = `${program.project.name} - ${program.name}`
    return `SetUp Schedule - ${title}`
}