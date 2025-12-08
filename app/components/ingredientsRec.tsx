import { Button } from "@/components/ui/button";
import { DocumentIcon } from "../icons/document";
import { MdOutlineRefresh } from "react-icons/md";
import { Loader, RefreshCw, StarIcon } from "lucide-react";
import { useState } from "react";
import { LuDot } from "react-icons/lu";

export const IngredientsRec = () => {
  const [text, setText] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/ingredients`, {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (data) {
        setTitle(data.title || "");
        setDescription(data.description || "");
        setIngredients(data.ingredients || []);
      }
    } catch (err) {
      console.log("Error");
    }
    setLoading(false);
  };
  const resetFunction = () => {
    setText("");
    setIngredients([]);
    setLoading(false);
    setDescription("");
    setTitle("");
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <StarIcon />{" "}
            <p className="font-semibold text-xl">Ingredient recognition</p>
          </div>
          <Button
            onClick={resetFunction}
            className="w-12 cursor-pointer h-10 border flex justify-center items-center"
          >
            <MdOutlineRefresh />
          </Button>
        </div>
        <div>
          <p className="font-normal text-sm text-neutral-400">
            Describe the food, and AI will detect the ingredients.
          </p>
        </div>
        <div className="flex gap-2 flex-col">
          <textarea
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            value={text}
            className="border p-2 rounded-lg w-full h-[124px]"
          ></textarea>
          <div className="flex justify-end">
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className=" h-10 bg-neutral-700 rounded-md "
            >
              {loading ? (
                <div className="flex items-center">
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...{" "}
                </div>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <DocumentIcon />{" "}
          <p className="font-semibold text-xl">Identified Ingredients</p>
        </div>

        {loading ? (
          <div className="flex gap-3 flex-col">
            <p>Working on your image just wait for moment...</p>
            <div className="flex justify-center items-center">
              {" "}
              <Loader className="w-4 h-4 animate-spin" />
            </div>
          </div>
        ) : ingredients.length > 0 ? (
          <div className="w-full border  p-2 flex flex-col gap-5 ">
            <h2 className="font-semibold text-xl">{title}</h2>
            <p className="text-neutral-400">{description}</p>
            <div>
              {" "}
              {ingredients.map((item, idx) => (
                <div className="flex items-center" key={idx}>
                  <LuDot /> {item}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-neutral-400">
            First, enter your text to recognize an ingredients.
          </p>
        )}
      </div>
    </div>
  );
};
