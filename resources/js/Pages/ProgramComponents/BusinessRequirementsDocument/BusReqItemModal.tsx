import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { useForm } from '@inertiajs/inertia-react';
import { Loader2 } from 'lucide-react';
import {FC, FormEventHandler, useEffect} from 'react';
import { toast } from 'sonner';

interface Props {
    isOpen?:boolean;
    onClose:()=>void;
    bus_req_id:number;
}

const BusReqItemModal:FC<Props> = ({isOpen,onClose,bus_req_id}) => {
    const {data,setData,processing,reset,post} = useForm({
        module:'',
        applicable_roles:'',
        description:'',
        bus_req_doc_id:bus_req_id
    });

    const onSubmit:FormEventHandler<HTMLFormElement> = e =>{
        e.preventDefault();
        post(route('business_requirement.item.store'),{
            onSuccess:()=>onClose(),
            onError:e=>{
                console.error(e);
                toast.error('Failed to create Business Requirements Item. Try again');
            }
        });
    
    }

    useEffect(()=>{
        if(!isOpen) reset();
    },[isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Business Requirements Document Item</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className='flex flex-col gap-y-2' >
                    <div className='space-y-1'>
                        <Label>Module/Field</Label>
                        <Input disabled={processing} required autoFocus type='text' value={data.module} onChange={e=>setData('module',e.target.value)} />
                    </div>
                    <div className='space-y-1'>
                        <Label>Applicable Roles</Label>
                        <Textarea rows={2} disabled={processing} required  value={data.applicable_roles} onChange={e=>setData('applicable_roles',e.target.value)} />
                    </div>
                    <div className='space-y-1'>
                        <Label>Description</Label>
                        <Textarea rows={2} disabled={processing} required  value={data.description} onChange={e=>setData('description',e.target.value)} />
                    </div>
                    <Button disabled={processing} className='ml-auto' size='sm' type='submit'>
                        {processing && <Loader2 className='animate-spin mr-2 h-5 w-5' /> }
                        Save
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BusReqItemModal;