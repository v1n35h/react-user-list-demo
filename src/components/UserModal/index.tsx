import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { format, parseISO } from "date-fns"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { CalendarIcon, PersonIcon, SewingPinIcon } from "@radix-ui/react-icons";
import { User } from "@/App.types";


interface UserModalProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>;
    user: User | null
}

const UserModal: FunctionComponent<UserModalProps> = ({ open, setOpen, user }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-11/12 sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>View User</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <img src={user?.picture?.large} className="w-full" width="128" height="128" />
                    <div className="flex flex-col">
                        <span className="font-bold whitespace-nowrap text-ellipsis">
                            {user?.name?.title} {user?.name?.first} {user?.name?.last}
                        </span>
                        <span className="whitespace-nowrap text-ellipsis">{user?.email}</span>
                        <div className="flex flex-row gap-2 items-center">
                            <CalendarIcon />
                            {user?.dob?.date && <span className="whitespace-nowrap text-ellipsis">{format(parseISO(user?.dob?.date as string), 'dd/MM/yyyy')}</span>}
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <PersonIcon />
                            <span className="whitespace-nowrap text-ellipsis">{user?.phone}</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <SewingPinIcon className="mt-1" />
                            <div className="flex flex-col">
                                <span>
                                    {user?.location?.street?.number} {user?.location?.street?.name},
                                </span>
                                <span>
                                    {user?.location?.city}, {user?.location?.state}, {user?.location?.postcode}
                                </span>
                            </div>
                        </div>

                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
}

export default UserModal;