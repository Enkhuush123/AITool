"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Loader, RefreshCw, StarIcon } from "lucide-react";
import { useState } from "react";
import { MdDeleteOutline, MdOutlineRefresh } from "react-icons/md";
import { DocumentIcon } from "../icons/document";

export const ImageAnalysis = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isGenerate, setIsGenerate] = useState(false);
  const [result, setResult] = useState<{ label: string; score: number }[]>([]);

  const resetFunction = () => {
    setImage(null);
    setPreview(null);
    setResult([]);
    setIsGenerate(false);
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleDelete = () => {
    setImage(null);
    setPreview(null);
  };

  const handleGenerate = async () => {
    if (!image) return;
    setIsGenerate(true);
    const form = new FormData();
    form.append("image", image);

    const result = await fetch(`/api/object-detection`, {
      method: "POST",
      body: form,
    });
    const data = await result.json();
    console.log(data, "result");

    setResult(
      data.objects.map((cur: { label: string; score: number }) => ({
        label: cur.label,
        score: cur.score,
      }))
    );

    setIsGenerate(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <StarIcon /> <p className="font-semibold text-xl">Image analysis</p>
          </div>
          <Button
            onClick={resetFunction}
            className="w-12 cursor-pointer h-10 border flex justify-center items-center "
          >
            <MdOutlineRefresh />
          </Button>
        </div>
        <div>
          <p className="font-normal text-sm text-neutral-400">
            Upload a food photo, and AI will detect the ingredients.
          </p>
        </div>
        <div className="flex gap-2 flex-col">
          {preview ? (
            <div className="w-52 h-[141px] relative ">
              <div className="w-full h-full absolute justify-end flex items-end p-2">
                <Button
                  onClick={handleDelete}
                  className="w-6 h-6  rounded-md items-center justify-center flex cursor-pointer "
                >
                  <MdDeleteOutline />
                </Button>
              </div>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              ></img>
            </div>
          ) : (
            <Label htmlFor="image">
              <div className="border p-3 rounded-lg w-full cursor-pointer">
                <p>
                  Choose File{"-"}
                  <span className="text-neutral-400">JPG, PNG</span>
                </p>
                <input
                  accept="*/image"
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleUploadImage}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                ></input>
              </div>
            </Label>
          )}

          <div className="flex justify-end">
            <Button
              onClick={handleGenerate}
              disabled={!image || isGenerate}
              className=" h-10 bg-neutral-700 rounded-md "
            >
              {isGenerate ? (
                <div className="flex">
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />{" "}
                  Generating...{" "}
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
          <DocumentIcon />{" "}
          <p className="font-semibold text-xl">Here is the summary</p>
        </div>
        {isGenerate ? (
          <div className="flex gap-3 flex-col">
            <p className="text-neutral-400">
              Im working on your image wait for a moment...
            </p>

            <div className="flex justify-center items-center">
              <Loader className="w-4 h-4 animate-spin" />
            </div>
          </div>
        ) : image ? (
          <div className="w-full border p-2">
            <p className="text-neutral-400">Detected Ingredients</p>
            <div className="flex flex-col gap-2">
              {result.map((item, idx) => (
                <div key={idx}>
                  <span>{item.label}</span> {"=>"}{" "}
                  <span>{(item.score * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-neutral-400">
            First, enter your image to recognize an ingredients.
          </p>
        )}
      </div>
    </div>
  );
};
