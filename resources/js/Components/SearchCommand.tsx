import { useSearch } from "@/Hooks/useSearch";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandList } from "./ui/command";
import { useEffect } from "react";

const SearchCommand = () => {
    const {toggle,isOpen,onClose} = useSearch();
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
    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder='Search a Project...' />
            <CommandList>
                <CommandEmpty>No Projects Found...</CommandEmpty>
                <CommandGroup heading='Documents'>
                    {/* {
                        documents.map(({id,...doc})=> (
                            <CommandItem onSelect={()=>onSelect(id)} key={id} value={`${id.toString()}-${doc.title}`}>
                                {doc.icon?<p className='mr-2 text-[1.125rem]'>{doc.icon}</p>:<File className='mr-2 h-4 w-4' /> }
                                <span>{doc.title}</span>
                            </CommandItem>
                        )
                    )} */}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
export default SearchCommand