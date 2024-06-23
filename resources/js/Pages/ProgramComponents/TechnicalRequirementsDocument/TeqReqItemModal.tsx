import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import { TechnicalRequirementsDocument, TechnicalRequirementsDocumentItem } from '@/types';
import { useForm } from '@inertiajs/inertia-react';
import { Loader2 } from 'lucide-react';
import {FC, FormEventHandler, useEffect} from 'react';
import { toast } from 'sonner';

interface Props {
    isOpen?:boolean;
    onClose:()=>void;
    teq_req_id:number;
    teqReqItem?:TechnicalRequirementsDocumentItem;
}

const TeqReqItemModal:FC<Props> = (props) => {
    const {isOpen,onClose,teq_req_id,teqReqItem} = props;
    const {data,setData,processing,reset,post} = useForm({
        req_description:'',
        test_case_description:'',
        test_case_remarks:'',
        test_case_status:'',
        teq_req_doc_id:teq_req_id
    });

    
    useEffect(()=>{
        if(!isOpen) reset();
        if(isOpen&&teqReqItem){
            setData(val=>({
                ...val,
                req_description:teqReqItem.req_description,
                test_case_description:teqReqItem.test_case_description,
                test_case_remarks:teqReqItem.test_case_remarks,
                test_case_status:teqReqItem.test_case_status            
            }));
        }
    },[isOpen,teqReqItem]);

    const onSubmit:FormEventHandler<HTMLFormElement> = e =>{
        e.preventDefault();
        const href = !!teqReqItem?route('tech_requirement.item.update',{id:teqReqItem.id}):route('tech_requirement.item.store');
        if(!data.test_case_status) return toast.error('Test Status is required');
        post(href,{
            onSuccess:()=>onClose(),
            onError:e=>{
                console.error(e);
                toast.error('Failed to create Business Requirements Item. Try again');
            }
        });    
    }


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='flex flex-col'>
                <DialogHeader className='h-auto'>
                    <DialogTitle>New Technical Requirements Document Item</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className='flex flex-col gap-y-2 flex-1' >
                    <div className='space-y-1'>
                        <Label>Req. Description</Label>
                        <Textarea rows={2} disabled={processing} required  value={data.req_description} onChange={e=>setData('req_description',e.target.value)} />
                    </div>
                    <div className='space-y-1'>
                        <Label>Test Description</Label>
                        <Textarea rows={2} disabled={processing} required  value={data.test_case_description} onChange={e=>setData('test_case_description',e.target.value)} />
                    </div>
                    <div className='space-y-1'>
                        <Label>Test Remarks</Label>
                        <Textarea rows={2} disabled={processing} required  value={data.test_case_remarks} onChange={e=>setData('test_case_remarks',e.target.value)} />
                    </div>
                    <div className='space-y-1'>
                        <Label>Test Status</Label>
                        <Select value={data.test_case_status} onValueChange={e=>setData('test_case_status',e)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent className='z-[500]'>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="ongoing">On-Going</SelectItem>
                                    <SelectItem value="success">Success</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
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

export default TeqReqItemModal;