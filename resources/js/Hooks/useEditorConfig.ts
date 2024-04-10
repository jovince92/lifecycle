import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const useEditorConfig = () =>{
    
    const editor = useEditor({
        extensions:[
            StarterKit,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
        ]
    });
    return {editor};
}


export default useEditorConfig
