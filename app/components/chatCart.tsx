import { Button } from "@/components/ui/button";
import { BsSend } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { FC } from "react";
interface ChatCartProps {
  onClose: () => void;
}
export const ChatCart: FC<ChatCartProps> = ({ onClose }) => {
  return (
    <div className=" absolute w-[380px] h-[472px] shadow-xl border z-50 rounded-md ">
      <div className="border-b flex justify-between p-2  gap-2 items-center ">
        <div>
          {" "}
          <p>Chat assistant</p>
        </div>
        <Button onClick={onClose} className="bg-none">
          <IoIosClose />
        </Button>
      </div>
      <div className="w-full h-[368px] border"></div>
      <div className="flex gap-3 p-1">
        <input
          className="w-[300px] outline-0 border p-2 rounded-md"
          placeholder="Type your message..."
        ></input>
        <Button className="w-10 h-10 bg-black rounded-full ">
          <BsSend />
        </Button>
      </div>
    </div>
  );
};
