import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import {FC, MouseEventHandler} from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { format } from 'date-fns';

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
}

const Item:FC<Props> = ({Icon,label,onClick,id,documentIcon,active,expanded,isSearch,level=0,onExpand,updateDate,isThemeToggle}) => {
    const ChevronIcon = expanded? ChevronDown:ChevronRight;
    const handleExpand:MouseEventHandler<HTMLDivElement> = e =>{
        e.stopPropagation();
        onExpand?.();
    }

    const handleCreate:MouseEventHandler<HTMLDivElement> = e =>{
        e.stopPropagation();
        if(!id) return;        
    }

    const handleArchive:MouseEventHandler<HTMLDivElement> = e =>{
        e.stopPropagation();
        if(!id) return;
    }
    

    return (
        <div onClick={onClick} role='button' 
            style={{ paddingLeft: level >0? `${(level*0.75)+0.75}rem` :'0.75rem' }} 
            className={cn('group min-h-[1.688rem] textt-sm py-1  pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium transition',
                active && 'bg-primary/5 text-primary'
            )}>
            {!!id && <div role='button' className='h-full rounded-sm opacity-70 hover:opacity-100 hover:bg-secondary transition mr-1' onClick={handleExpand}><ChevronIcon className='h-4 w-4 shrink-0 text-muted-foreground/50' /></div>}
            {documentIcon?<div className='shrink-0 mr-2 text-[1.125rem]'>{documentIcon}</div>:<Icon className='shrink-0 h-[1.125rem] w-[1.125rem] mr-2 text-muted-foreground' />}
            
            <span className='truncate'>{label}</span>
            {
                isSearch && (
                    <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[0.625rem] text-muted-foreground'>
                        <span className='text-sm'>CTRL</span>K
                    </kbd>
                )
            }
            
            {
                !!id && (
                    <div className='ml-auto flex items-center gap-x-1.5'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={e=>e.stopPropagation()}>
                                <div role='button' className='opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-secondary transition'>
                                    <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-60' align='start' side='right' forceMount>
                                <DropdownMenuItem onClick={handleArchive}>
                                    <Trash2 className='h-4 w-4 mr-2' />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {/* <div className='text-xs text-muted-foreground p-2'>
                                    Last Edited: {format(updateDate!,'PPpp')}
                                </div> */}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div role='button' onClick={handleCreate} className='opacity-0 group-hover:opacity-100 transition h-full ml-auto rounded-sm hover:bg-secondary'>
                            <Plus className='h-4 w-4 text-muted-foreground'/>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Item;