import { Button } from '@/Components/ui/button';
import { Calendar } from '@/Components/ui/calendar';
import { Checkbox } from '@/Components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { Textarea } from '@/Components/ui/textarea';
import { cn } from '@/lib/utils';
import { Program } from '@/types';
import { useForm } from '@inertiajs/inertia-react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import {FC} from 'react';

interface Props {
    program:Program;
    open:boolean;
    onClose:()=>void;
}

const NewCrModal:FC<Props> = ({program,open,onClose}) => {
    const {data,setData,processing,reset} = useForm({
        title:'',
        description:'',
        client_request:0,
        incident_or_problem_resolution:0,
        enhancement:0,
        business_requirement:0,
        procedural:0,
        others:0,
        others_description:'',
        schedule:'',
        hardware:'',
        software:'',
        manpower:'',
        location:'',
        office_equipment:'',
        other:'',
    });

    const setClientRequest = () =>{
        //set client_request to 1 and incident_or_problem_resolution,enhancement,business_requirement,procedural,others to 0
        setData(val=>({...val,client_request:1,incident_or_problem_resolution:0,enhancement:0,business_requirement:0,procedural:0,others:0}));
    }
    const setIncidentOrProblemResolution = () =>{
        //set incident_or_problem_resolution to 1 and client_request,enhancement,business_requirement,procedural,others to 0
        setData(val=>({...val,client_request:0,incident_or_problem_resolution:1,enhancement:0,business_requirement:0,procedural:0,others:0}));
    }
    const setEnhancement = () =>{
        //set enhancement to 1 and client_request,incident_or_problem_resolution,business_requirement,procedural,others to 0
        setData(val=>({...val,client_request:0,incident_or_problem_resolution:0,enhancement:1,business_requirement:0,procedural:0,others:0}));
    }
    const setBusinessRequirement = () =>{
        //set business_requirement to 1 and client_request,incident_or_problem_resolution,enhancement,procedural,others to 0
        setData(val=>({...val,client_request:0,incident_or_problem_resolution:0,enhancement:0,business_requirement:1,procedural:0,others:0}));
    }
    const setProcedural = () =>{
        //set procedural to 1 and client_request,incident_or_problem_resolution,enhancement,business_requirement,others to 0
        setData(val=>({...val,client_request:0,incident_or_problem_resolution:0,enhancement:0,business_requirement:0,procedural:1,others:0}));
    }
    const setOthers = () =>{
        //set others to 1 and client_request,incident_or_problem_resolution,enhancement,business_requirement,procedural to 0
        setData(val=>({...val,client_request:0,incident_or_problem_resolution:0,enhancement:0,business_requirement:0,procedural:0,others:1}));
    }

    const setResourceDescription = (val:string) => setData('others_description',val);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='max-w-[90vw] max-h-[95vh] h-full flex flex-col space-x-1.5'>
                <DialogHeader className='h-auto'>
                    <DialogTitle>Change Management Request Form</DialogTitle>
                    <DialogDescription>
                        New Change Management Request
                    </DialogDescription>
                </DialogHeader>
                <form className='flex flex-col gap-y-3.5 flex-1 overflow-y-auto relative pr-6 pb-6'>
                    <div className='space-y-1'>
                        <Label>Change Proposal Title</Label>
                        <Input required disabled={processing} autoFocus value={data.title} onChange={(e)=>setData('title',e.target.value)} />
                    </div>
                    <div className='space-y-1'>
                        <Label>Change Description</Label>
                        <Textarea rows={2} required disabled={processing} value={data.description} onChange={(e)=>setData('description',e.target.value)}  />
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <Label>Source of Change Request</Label>
                        
                            <div className='flex items-center'>
                                <div className='flex flex-col gap-y-2.5 w-1/2'>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox onCheckedChange={setClientRequest} checked={data.client_request===1} disabled={processing}  id="client_request" />
                                        <label
                                            htmlFor="client_request"
                                            className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Client Request
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox onCheckedChange={setIncidentOrProblemResolution} checked={data.incident_or_problem_resolution===1} disabled={processing}  id="incident" />
                                        <label
                                            htmlFor="incident"
                                            className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Incident or Problem Resolution
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox onCheckedChange={setEnhancement} checked={data.enhancement===1} disabled={processing}  id="enhancement" />
                                        <label
                                            htmlFor="enhancement"
                                            className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Enhancement
                                        </label>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-y-2.5 flex-1'>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox onCheckedChange={setBusinessRequirement} checked={data.business_requirement===1} disabled={processing}  id="business_requirement" />
                                        <label
                                            htmlFor="business_requirement"
                                            className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Business Requirement
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox onCheckedChange={setProcedural} checked={data.procedural===1} disabled={processing}  id="procedural" />
                                        <label
                                            htmlFor="procedural"
                                            className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Procedural
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox onCheckedChange={setOthers} checked={data.others===1} disabled={processing}  id="others" />
                                        <label
                                            htmlFor="others"
                                            className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Others
                                        </label>
                                        <Input className='!h-9' disabled={processing||data.others!==1} value={data.others_description} onChange={(e)=>setResourceDescription(e.target.value)} />
                                    </div>
                                </div>
                                
                            </div>
                        
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <Label>Schedule</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !data.schedule && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {data.schedule ? format(new Date(data.schedule), "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                mode="single"
                                selected={new Date(data.schedule)}
                                onSelect={e=>e&&setData('schedule',format(e,'yyyy-MM-dd'))}
                                initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <Label>Resource Requirements</Label>
                        <div className='flex items-center gap-x-2.5'>
                            <div className='w-1/2 flex flex-col gap-y-2.5'>
                                <div className='space-y-1'>
                                    <Label>Hardware</Label>
                                    <Input disabled={processing} value={data.hardware} onChange={(e)=>setData('hardware',e.target.value)} />
                                </div>
                                <div className='space-y-1'>
                                    <Label>Manpower</Label>
                                    <Input disabled={processing} value={data.manpower} onChange={(e)=>setData('manpower',e.target.value)} />
                                </div>
                                <div className='space-y-1'>
                                    <Label>Office Equipment</Label>
                                    <Input disabled={processing} value={data.office_equipment} onChange={(e)=>setData('office_equipment',e.target.value)} />
                                </div>

                            </div>
                            <div className='flex-1 flex flex-col gap-y-2.5'>
                                <div className='space-y-1'>
                                    <Label>Software</Label>
                                    <Input disabled={processing} value={data.software} onChange={(e)=>setData('software',e.target.value)} />
                                </div>
                                <div className='space-y-1'>
                                    <Label>Location</Label>
                                    <Input disabled={processing} value={data.location} onChange={(e)=>setData('location',e.target.value)} />
                                </div>
                                <div className='space-y-1'>
                                    <Label>Other</Label>
                                    <Input disabled={processing} value={data.other} onChange={(e)=>setData('other',e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewCrModal;