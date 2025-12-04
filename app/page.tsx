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
import { IngredientsRec } from "./components/ingredientsRec";
import { ImageCreator } from "./components/imageCreator";

export default function Home() {
  const [chat, setChat] = useState<boolean>(false);

  return (
    <div className="flex gap-5 flex-col w-full m-auto ">
      <div className="w-full h-14 flex items-center m-auto border pl-12">
        <h1> Enkhuush's AI tools</h1>
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
            <IngredientsRec />
          </TabsContent>
          <TabsContent value="creator">
            <ImageCreator />
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
