
import { PageProps, Project } from "@/types";
import { Inertia, Page } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { FC, FormEventHandler, useEffect, useState } from "react"
import Item from "./Navigation/Item";
import { CheckIcon, ChevronsUpDownIcon, FileIcon, FolderIcon, FolderOpenIcon, Loader2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { useProjectModal } from "@/Hooks/useProjectModal";
import { useLocalStorage } from "usehooks-ts";

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface Props{
    selected_project?:Project;
}

const ProjectList:FC<Props> = ({selected_project}) => {
    const {projects} = usePage<Page<PageProps>>().props;
    const [expanded,setExpanded] = useLocalStorage<Record<number,boolean>>('expanded',{});  


    const onExpand = (id:number) => setExpanded(val=>({...val,[id]:!val[id]}));

    const navigate = (id:number) => {
        Inertia.get(route('projects.show',{id}),{},{
            onFinish:()=>setExpanded(val=>({...val,[id]:true}))
        })
    };
    
    const {onOpen} = useProjectModal();

    const handleEdit = (id:number) =>  onOpen(projects.find(p=>p.id===id));
    const [showNewProgramModal,setShowNewProgramModal] = useState(false);
    const [activeId,setActiveId] = useState(0);
    const openNewProgramModal = (id:number) =>{
        setActiveId(id);
        setShowNewProgramModal(true);
    }
    return (
        <>
            <div className="flex flex-col gap-y-1.5 pb-3.5 w-full">
                {
                    projects.map(({id,...document})=>(
                        <div key={id}>
                            <Item
                                onEdit={handleEdit}
                                id={id} 
                                onClick={()=>navigate(id)}
                                label={document.name}
                                Icon={expanded[id]?FolderOpenIcon:FolderIcon}
                                active={selected_project?.id===id}
                                onExpand={()=>onExpand(id)}
                                expanded={expanded[id]}
                                updateDate={new Date(document.updated_at)}
                                onNewProgram={openNewProgramModal}
                                />
                        </div>
                    ))
                }
            </div>
            
            <NewProgramModal project_id={activeId} isOpen={showNewProgramModal} onClose={()=>setShowNewProgramModal(false)} />
        </>
    )
}
export default ProjectList;


interface NewProgramModalProps{
    isOpen?:boolean;
    onClose:()=>void;
    project_id:number;
}

const NewProgramModal:FC<NewProgramModalProps>= ({project_id,isOpen,onClose}) =>{

    const [openDepartments,setOpenDepartments] = useState(false);
    
    const {departments} = usePage<Page<PageProps>>().props;

    const {data,setData,processing,post}  = useForm({
        project_id,
        name:'',
        department:''
    });


    const onSubmit:FormEventHandler<HTMLFormElement> = e =>{
        e.preventDefault();
        if(!data.department) return toast.error('Please select a department.');
        post(route('programs.new'),{
            onError:e=>{
                console.error(e);
                toast.error('An error occured while creating the program. Please try again.');
            },
            onSuccess:()=>{
                toast.success('Program created successfully.');
                onClose();
            }
        });    
    }

    useEffect(()=>{
        if(!isOpen) return;
        setData(val=>({...val,project_id,name:'',department:''}));
    },[project_id,isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="md:min-w-[30rem] w-full">
                <DialogHeader>
                    <DialogTitle>New Program</DialogTitle>
                    <DialogDescription>
                        Enter Program Details
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} id='new_program' className="flex flex-col gap-y-2.5">
                    <div className="flex flex-col gap-y-1.5">
                        <Label htmlFor="name" >
                            Name
                        </Label>
                        <Input required value={data.name} onChange={({target})=>setData('name',target.value)} autoComplete='off' autoFocus disabled={processing} id="name"  />
                    </div>
                    <div className="flex flex-col gap-y-1.5">
                        <Label htmlFor="username" >
                            Department
                        </Label>
                        <Popover open={openDepartments} onOpenChange={setOpenDepartments}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" disabled={processing} role="combobox" aria-expanded={openDepartments} className=" justify-between">
                                {data.department || "Select department..."}
                                <ChevronsUpDownIcon className="ml-2 h-5 w-5 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0 z-[500]">
                                <Command>
                                    <CommandInput placeholder=" Search department..." className="w-full h-9" />
                                    <CommandEmpty>No department found.</CommandEmpty>
                                    <CommandGroup className="max-h-52 overflow-y-auto w-full">
                                        {departments.map(({id,name}) => (
                                            <CommandItem
                                                key={id}
                                                onSelect={() => {
                                                    setData('department',name);
                                                    setOpenDepartments(false);
                                                }}>
                                                {name}
                                                <CheckIcon
                                                className={cn(
                                                    "ml-auto h-5 w-5",
                                                    data.department === name ? "opacity-100" : "opacity-0"
                                                )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </form>
                <DialogFooter>
                    <Button form='new_program' type="submit" disabled={processing}>
                        {processing && <Loader2 className="h-5 w-5 mr-2 animate-spin" />}
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}