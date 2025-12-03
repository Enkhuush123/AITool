"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarIcon } from "./icons/starIcon";
import { RefreshIcon } from "./icons/refreshIcon";
import { DocumentIcon } from "./icons/document";
import { ImageIcon } from "./icons/imageIcon";
import { Label } from "@/components/ui/label";
import { ChatIcon } from "./icons/chatIcon";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatCart } from "./components/chatCart";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineRefresh } from "react-icons/md";
import { ImageAnalysis } from "./components/imageAnalysis";

export default function Home() {
  const [chat, setChat] = useState<boolean>(false);

  return (
    <div className="flex gap-5 flex-col w-full m-auto ">
      <div className="w-full h-14 flex items-center m-auto border pl-12">
        <h1>AI tools</h1>
      </div>

      <div className="w-[580px] m-auto">
        <Tabs defaultValue="image" className="w-[580px]">
          <TabsList>
            <TabsTrigger value="image">Image analysis</TabsTrigger>
            <TabsTrigger value="ingredient">Ingredient recognition</TabsTrigger>
            <TabsTrigger value="creator">Image creator</TabsTrigger>
          </TabsList>
          <TabsContent value="image">
            <ImageAnalysis />
          </TabsContent>
          <TabsContent value="ingredient">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <StarIcon />{" "}
                    <p className="font-semibold text-xl">
                      Ingredient recognition
                    </p>
                  </div>
                  <Button className="w-12 h-10 border flex justify-center items-center">
                    <MdOutlineRefresh />
                  </Button>
                </div>
                <div>
                  <p className="font-normal text-sm text-neutral-400">
                    Describe the food, and AI will detect the ingredients.
                  </p>
                </div>
                <div className="flex gap-2 flex-col">
                  <textarea className="border p-2 rounded-lg w-full h-[124px]"></textarea>
                  <div className="flex justify-end">
                    <Button className="w-[94px] h-10 bg-neutral-700 rounded-md ">
                      <p className="text-white">Generate</p>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <DocumentIcon />{" "}
                  <p className="font-semibold text-xl">
                    Identified Ingredients
                  </p>
                </div>
                <p className="font-normal text-sm text-neutral-400">
                  First, enter your text to recognize an ingredients.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="creator">
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
                  <textarea className="border p-2 rounded-lg w-full h-[124px]"></textarea>
                  <div className="flex justify-end">
                    <Button className="w-[94px] h-10 bg-neutral-700 rounded-md ">
                      <p className="text-white">Generate</p>
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <ImageIcon /> <p className="font-semibold text-xl">Result</p>
                </div>
                <p className="font-normal text-sm text-neutral-400">
                  First, enter your text to generate an image.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="fixed bottom-5 right-1 flex justify-end p-10 items-end z-50">
        {!chat && (
          <Button
            onClick={() => setChat(true)}
            className={`w-12 h-12 bg-black flex rounded-full  
             
            }`}
          >
            <ChatIcon />
          </Button>
        )}

        {chat && <ChatCart onClose={() => setChat(false)} />}
      </div>
    </div>
  );
}
