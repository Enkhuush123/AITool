import { Button } from "@/components/ui/button";
import { ImageIcon, Loader, RefreshCw, StarIcon } from "lucide-react";
import { useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";

export const ImageCreator = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setImage(null);

    try {
      const res = await fetch(`/api/image-creator`, {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log(data);
      if (data.image) setImage(data.image);
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <StarIcon />{" "}
            <p className="font-semibold text-xl">Food image creator</p>
          </div>
          <Button className="w-12 h-10 border flex justify-center items-center">
            <MdOutlineRefresh />
          </Button>
        </div>
        <div>
          <p className="font-normal text-sm text-neutral-400">
            What food image do you want? Describe it briefly.
          </p>
        </div>
        <div className="flex gap-2 flex-col">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="border p-2 rounded-lg w-full h-[124px]"
          ></textarea>
          <div className="flex justify-end">
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="p-2 bg-neutral-700 rounded-md "
            >
              {loading ? (
                <div className="flex  items-center">
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />{" "}
                  Generating...
                </div>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <ImageIcon /> <p className="font-semibold text-xl">Result</p>
        </div>
        {loading ? (
          <div className="flex flex-col gap-3">
            <p className="text-neutral-400">
              Working on your image just wait for a moment...
            </p>
            <div className="flex justify-center items-center">
              <Loader className="w-4 h-4 animate-spin" />
            </div>
          </div>
        ) : image ? (
          <div className="p-2 border flex gap-2 flex-col ">
            <p>{prompt} : </p>
            <img
              src={image}
              alt="Generated"
              className="w-[360px] h-[360px] rounded-lg"
            />
          </div>
        ) : (
          <p className="text-neutral-400">
            First, enter a description and click Generate.
          </p>
        )}
      </div>
    </div>
  );
};
