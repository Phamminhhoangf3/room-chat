import React from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

export default function ChatTopbar({ dataRoom }: any) {
  const { users, room } = dataRoom;
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex flex-col">
        <span className="font-medium">{`Phòng ${room}`}</span>
        <span className="text-xs">{`Số thành viên: ${users?.length}`}</span>
      </div>
      <div className="flex gap-2">
        {users.length &&
          users.map((user: any) => (
            <Avatar className="flex justify-center items-center" key={user.id}>
              <AvatarImage
                src={user.avatar}
                alt={user.name}
                width={6}
                height={6}
                className="w-10 h-10 "
              />
            </Avatar>
          ))}
      </div>
    </div>
  );
}
