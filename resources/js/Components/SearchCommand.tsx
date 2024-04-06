import { useSearch } from "@/Hooks/useSearch";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia, Page } from "@inertiajs/inertia";
import { PageProps } from "@/types";
import { FileIcon } from "lucide-react";

const SearchCommand = () => {
    const {toggle,isOpen,onClose} = useSearch();
    
    const {projects} = usePage<Page<PageProps>>().props;
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            toggle();
        }
        }
    
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, []);

    const onSelect = (id:number) =>{
        Inertia.get(route('projects.show',{id}));
        onClose();
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder='Search a Project...' />
            <CommandList>
                <CommandEmpty>No Projects Found...</CommandEmpty>
                <CommandGroup heading='Projects'>
                    {
                        projects.map(({id,...proj})=> (
                            <CommandItem onSelect={()=>onSelect(id)} key={id} value={`${id.toString()}-${proj.name}`}>
                                <FileIcon className='mr-2 h-4 w-4' />
                                <span>{proj.name}</span>
                            </CommandItem>
                        )
                    )}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
export default SearchCommand