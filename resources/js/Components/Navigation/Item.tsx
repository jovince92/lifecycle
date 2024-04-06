import { cn } from '@/lib/utils';
import { CheckIcon, ChevronDown, ChevronRight, ChevronsUpDownIcon, Command, LucideIcon, MoreHorizontal, PencilIcon, Plus, Target, Trash2 } from 'lucide-react';
import {FC, MouseEventHandler, useEffect, useMemo, useState} from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { format } from 'date-fns';
import Hint from '../Hint';
import { useArchiveProject } from '@/Hooks/useArchiveProject';
import { useProgramModal } from '@/Hooks/useProgramModal';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { Page } from '@inertiajs/inertia';
import { PageProps } from '@/types';
import ProgramItem from './ProgramItem';


interface Props {
    id?:number;
    documentIcon?:string;
    active?:boolean;
    expanded?:boolean;
    isSearch?:boolean;
    level?:number;
    onExpand?:()=>void;
    onClick?:()=>void;
    label:string;
    Icon:LucideIcon;
    updateDate?:Date;
    isThemeToggle?:boolean;
    onEdit?:(id:number)=>void;
    onNewProgram?:(id:number)=>void;
}

const Item:FC<Props> = ({Icon,label,onClick,id,documentIcon,active,expanded,isSearch,level=0,onExpand,updateDate,onEdit,onNewProgram}) => {
    const {projects} = usePage<Page<PageProps>>().props;

    const programs = useMemo(()=>projects.find(p=>p.id===id)?.programs||[],[projects]);

    const ChevronIcon = expanded? ChevronDown:ChevronRight;
    const {onOpen} = useArchiveProject();
    const handleExpand:MouseEventHandler<HTMLDivElement> = e =>{
        e.stopPropagation();
        onExpand?.();
    }

    const handleCreate:MouseEventHandler<HTMLDivElement> = e =>{
        e.stopPropagation();
        if(!id) return; 
        onNewProgram&&onNewProgram(id);       
    }

    const handleArchive:MouseEventHandler<HTMLDivElement> = e =>{
        e.stopPropagation();
        if((!id)) return;
        onOpen(id);
    }
    
    const handleEdit:MouseEventHandler<HTMLDivElement> = e =>{
        
        e.stopPropagation();
        if((!id))  return;
        onEdit&&onEdit(id);
    }

    const user = useMemo(()=>projects.find(p=>p.id===id)?.user, [projects,id]);

    return (
    
        <div className='flex flex-col'>
            <div onClick={onClick} role='button' 
                style={{ paddingLeft: level >0? `${(level*0.75)+0.75}rem` :'0.75rem' }} 
                className={cn('group min-h-[1.688rem] text-sm py-1  pr-3 w-full hover:bg-primary/5 flex items-center  font-medium transition',
                    active && 'bg-primary/5 text-primary'
                )}>
                {!!id && <div role='button' className='h-full rounded-full opacity-70 hover:opacity-100 hover:bg-secondary transition mr-1' onClick={handleExpand}>
                    <Hint label={expanded?'Collapse':'Expand'}>
                        <ChevronIcon className='h-5 w-5 shrink-0 ' />
                    </Hint>
                </div>}
                {documentIcon?<div className='shrink-0 mr-2 text-[1.125rem]'>{documentIcon}</div>:<Icon className='shrink-0 h-[1.125rem] w-[1.125rem] mr-2 ' />}
                
                <span className={cn('truncate',!!id && 'text-lg capitalize')}>{label}</span>
                {
                    isSearch && (
                        <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-muted-foreground/50 bg-muted px-1.5 font-mono text-[0.625rem] '>
                            <span className='text-xs'>CTRL</span>K
                        </kbd>
                    )
                }
                
                {
                    !!id && (
                        <div className='ml-3.5 flex items-center gap-x-1.5'>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={e=>e.stopPropagation()}>
                                    <div role='button' className='rounded-full opacity-0 group-hover:opacity-100 h-full ml-auto  hover:bg-secondary transition'>
                                        <MoreHorizontal className='h-5 w-5 ' />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='w-60' align='start' side='right' >
                                    <DropdownMenuItem onClick={handleEdit}>
                                        <PencilIcon className='h-5 w-5 mr-2' />
                                        <span>Edit</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleArchive}>
                                        <Trash2 className='h-5 w-5 mr-2' />
                                        <span>Archive</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <div className='text-xs  p-2'>
                                        {!!user&&<p>Created By: {`${user.first_name} ${user.last_name}`}</p>}
                                        Last Edited: {format(updateDate!,'PPpp')}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Hint side='left' label='Add a Program to this Project'>
                                <div role='button' onClick={handleCreate} className=' rounded-full opacity-0 group-hover:opacity-100 transition h-full ml-auto  hover:bg-secondary'>
                                    <Plus className='h-5 w-5 '/>
                                </div>
                            </Hint>
                        </div>
                    )
                }                
            </div>
            {expanded && (
                <div className='flex pl-0.5 w-full'>
                    <div className='-mt-2 border-r border-r-muted-foreground pl-5' />
                    <div className='pl-5 flex-1 pr-2.5 relative'>
                        {!programs.length && <div className=' text-xs pt-1 pl-1'>No Programs for This Project</div>}
                        {
                            programs.map(program=>(
                                <ProgramItem key={program.id} program={program} />
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default Item;
