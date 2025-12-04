import { Button } from "@/components/ui/button";
import { BsSend } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { FC, useEffect, useRef, useState } from "react";
interface ChatCartProps {
  onClose: () => void;
}
export const ChatCart: FC<ChatCartProps> = ({ onClose }) => {
  const [message, setMessage] = useState<
    { from: "user" | "bot"; text: string; id: number }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [message, loading]);

  const sendMessage = async () => {
    if (!input) return;
    const userMsg = {
      from: "user" as const,
      text: input,
      id: message.length + 1,
    };
    setMessage((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const result = await fetch(`/api/chat-bot`, {
        method: "POST",
        body: JSON.stringify({ message: userMsg.text }),
      });
      const data = await result.json();

      const recipeText = data.reply || "No response from AI";

      console.log(data);
      if (data.reply) {
        const botMsg = {
          from: "bot" as const,
          text: recipeText,
          id: message.length + 2,
        };
        setMessage((prev) => [...prev, botMsg]);
      }
    } catch (error) {
      const errorMsg = {
        from: "bot" as const,
        text: "Error occurred",
        id: message.length + 2,
      };
      setMessage((prev) => [...prev, errorMsg]);
    }
    setLoading(false);
  };

  return (
    <div className=" relative w-[380px] shadow-xl border z-50 rounded-md ">
      <div className="border-b flex justify-between p-2  gap-2 items-center ">
        <div>
          {" "}
          <p>Chat assistant</p>
        </div>
        <Button onClick={onClose} className="bg-none">
          <IoIosClose />
        </Button>
      </div>
      <div className="w-full overflow-auto flex flex-col gap-2 h-[368px] p-2 ">
        {message.length === 0 && <p>Say hello to start chat!</p>}

        {message.map((msg, i) => (
          <div
            key={i}
            className={`  p-2 rounded-md max-w-[250px] ${
              msg.from === "user"
                ? "bg-neutral-100 text-black ml-auto"
                : "bg-black text-white mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && <p>AI Writing...</p>}

        <div ref={messageEndRef} />
      </div>
      <div className="flex gap-3 justify-center p-1 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="w-[300px] outline-0 border p-2 rounded-md"
          placeholder="Type your message..."
        ></input>
        <Button
          onClick={sendMessage}
          disabled={loading}
          className="w-10 h-10 bg-black rounded-full "
        >
          <BsSend />
        </Button>
      </div>
    </div>
  );
};
