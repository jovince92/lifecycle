import { Button } from '@/Components/ui/button';
import { Calendar } from '@/Components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { cn } from '@/lib/utils';
import { Program } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import {FC, useEffect, useState} from 'react';
import { toast } from 'sonner';

interface Props {
    program:Program;
    isOpen:boolean;
    onClose:()=>void;
}

const SetupSchedule:FC<Props> = ({program,isOpen,onClose}) => {
    const [date, setDate] = useState<Date|undefined>(undefined);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        if(!isOpen) return;
        const sched = program.program_setup_schedule?new Date(program.program_setup_schedule.date):undefined;
        setDate(sched);
    },[program,isOpen]);

    const onSubmit = () =>{
        if (!date) return;
        Inertia.post(route('programs.setup_sched'),{
            date,
            program_id:program.id
        },{
            onStart:()=>setLoading(true),
            onFinish:()=>setLoading(false),
            onSuccess:()=>{
                onClose();
                toast.success('Setup Schedule Updated Successfully');
            },
            onError:()=>toast.error('An error occurred. Please try again later.')
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{program.name}</DialogTitle>
                    <DialogDescription>
                        Input Setup Schedule
                    </DialogDescription>
                </DialogHeader>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button disabled={loading}
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a Set Up date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        />
                    </PopoverContent>
                </Popover>
                <DialogFooter>
                    <Button size='sm' onClick={onSubmit} disabled={loading}>
                        {loading && <Loader2 className='h-5 w-5 animate-spin mr-2' />}
                        Set Setup Schedule
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SetupSchedule;