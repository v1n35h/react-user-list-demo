import { FunctionComponent } from "react";
import { Card } from "@/components/ui/card";
import { User } from "@/App.types";

interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {
    user: User
}

const UserCard: FunctionComponent<UserCardProps> = ({ user, ...props }) => {
    return (
        <Card className="overflow-hidden cursor-pointer" {...props}>
            <img src={user.picture.large} className="w-full" width="128" height="128" />
            <div className="p-3 flex flex-col">
                <span className="font-bold whitespace-nowrap text-ellipsis">
                    {user.name.title} {user.name.first} {user.name.last}
                </span>
                <span className=" whitespace-nowrap text-ellipsis">{user.email}</span>
            </div>
        </Card>

    );
}

export default UserCard;