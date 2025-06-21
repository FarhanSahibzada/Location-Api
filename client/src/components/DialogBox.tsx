import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog"

interface dialogProps {
    title : string ,
    description : string,
    children : React.ReactNode,
    isDialogOpen : boolean,
    setIsDialogOpen :  React.Dispatch<React.SetStateAction<boolean>>
}

export default function DialogBox({title , description, children , isDialogOpen , setIsDialogOpen} : dialogProps) {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
            <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto  rounded-md">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}