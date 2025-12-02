import { Button } from "@/components/ui/button";
import { BsSend } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";

export const ChatCart = () => {
  return (
    <div className="w-[380px] h-[472px]">
      <div className="border-b flex justify-between ">
        <div>
          {" "}
          <p>Chat assistant</p>
        </div>
        <Button>
          <IoIosClose />
        </Button>
      </div>
      <div className="w-full h-[368px] border"></div>
      <div className="border-t">
        <input
          className="w-[300px] outline-0 border p-2"
          placeholder="Type your message..."
        ></input>
        <Button className="w-10 h-10 bg-black rounded-full">
          <BsSend />
        </Button>
      </div>
    </div>
  );
};
