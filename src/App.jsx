import React, { useState } from "react";
import "./App.css";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";

// Importing icons (make sure you have lucide-react installed)
import {
  Plus,
  MoreHorizontal,
  Trash,
  StarOff,
  ArrowUp,
  Paperclip,
  PencilIcon,
  PencilLine,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./components/ui/textarea";

// Menu items
const items = [
  {
    title: "Home",
    url: "#",
  },
  {
    title: "Inbox",
    url: "#",
  },
  {
    title: "Calendar",
    url: "#",
  },
  {
    title: "Search",
    url: "#",
  },
  {
    title: "Settings",
    url: "#",
  },
];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  return (
    <div>
      <div className="h-32 border-b bg-background sticky top-0 w-full"></div>
      <SidebarProvider
        onOpenChange={() => setIsSidebarOpen(!isSidebarOpen)}
        open={isSidebarOpen}
      >
        <div className="flex w-full">
          <AppSidebar />
          <main className="flex-1 p-4 w-full">
            <div className="flex items-center gap-3 sticky top-36">
              <SidebarTrigger className="border-2 p-2 hover:bg-muted !h-[40px] !w-[40px]" />
              {!isSidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "size-7 border-2 p-2 hover:bg-muted !h-[40px] !w-[40px] flex items-center justify-center"
                  )}
                >
                  <Plus />
                </Button>
              )}
              <SelectDemo />
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "size-7 border-2 p-2 hover:bg-muted w-auto !h-[40px] flex items-center justify-center md:hidden ml-auto"
                )}
              >
                <Plus /> New Chat
              </Button>
            </div>
            <div className="container max-w-4xl mx-auto mb-[10%]">
              <div>
                <ChatMessages />
                <ChatMessageReply />
                {/* <ChatMessages />
                <ChatMessageReply /> */}
              </div>
              <InputFields />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default App;

function AppSidebar() {
  return (
    <Sidebar className="top-32">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl !text-white">
            Chatbot
          </SidebarGroupLabel>
          <SidebarGroupAction title="Add Project">
            <Plus />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="left"
                      align="start"
                      className="bg-background mt-4 translate-x-6 rounded-lg"
                    >
                      <DropdownMenuItem className="!text-red-600 focus:bg-background hover:!bg-red-600/10">
                        <Trash className="text-red-600" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function SelectDemo() {
  const [selected, setSelected] = useState("apple");

  // A mapping of value to label text (the <h4>)
  const labelMap = {
    apple: "xAi",
    banana: "40",
    blueberry: "4.1",
    grapes: "4.1-mini",
    pineapple: "4.1-nano",
  };

  return (
    <Select defaultValue="apple" onValueChange={(val) => setSelected(val)}>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit">
          {selected ? <h4>{labelMap[selected]}</h4> : null}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">
            <div>
              <h4>xAi</h4>
              <p>Use the default xAi Grok model</p>
            </div>
          </SelectItem>
          <SelectItem value="banana">
            <div>
              <h4>40</h4>
              <p>Use OpenAI gpt-40</p>
            </div>
          </SelectItem>
          <SelectItem value="blueberry">
            <div>
              <h4>4.1</h4>
              <p>Use OpenAI gpt-4.1 reasoning model</p>
            </div>
          </SelectItem>
          <SelectItem value="grapes">
            <div>
              <h4>4.1-mini</h4>
              <p>Use OpenAI gpt-4.1-mini</p>
            </div>
          </SelectItem>
          <SelectItem value="pineapple">
            <div>
              <h4>4.1-nano</h4>
              <p>Use OpenAI gpt-4.1-nano</p>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function InputFields() {
  const [message, setMessage] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (message.trim() !== "") {
      console.log("Submitting message:", message);
      setMessage("");
    }
  };
  return (
    <div className="container max-w-4xl mx-auto fixed bottom-0 pb-10 bg-background">
      <div className="border-2 rounded-xl p-2 bg-background">
        <Textarea
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message..."
          className="min-h-auto max-h-[70lvh] border-none select-none focus-visible:ring-0 resize-none !text-base placeholder:text-base !font-medium placeholder:font-medium placeholder:text-secondary"
        />
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              "size-7 border-none p-1 !w-fit !h-fit flex items-center justify-center rounded-full bg-transparent hover:bg-transparent cursor-pointer"
            )}
          >
            <Paperclip className="text-white -rotate-45" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              "size-7 border-2 p-1 hover:bg-muted flex items-center justify-center bg-white rounded-full"
            )}
          >
            <ArrowUp className="text-background" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ChatMessages() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      <div
        className={cn(
          "w-fit ml-auto max-w-10/12 flex items-start gap-3 group",
          !isEditing && "w-full"
        )}
      >
        <div
          className={cn(
            "mt-1.5 invisible group-hover:visible cursor-pointer select-none",
            !isEditing && "hidden"
          )}
        >
          <PencilLine onClick={() => setIsEditing(!isEditing)} size={17} />
        </div>
        {/* <div className="bg-white text-primary px-2.5 py-2 rounded-md text-base">
          How are my friend? How are my friend?
        </div> */}
        <div
          className={cn(
            "border-2 rounded-xl p-2 bg-background text-wrap w-full",
            !isEditing && "border-primary"
          )}
        >
          <Textarea
            disabled={isEditing}
            // placeholder="How are my friend? How are my friend?"
            defaultValue="How are my friend? How are my friend?"
            className="min-h-auto max-h-[70lvh] border-none select-none focus-visible:ring-0 resize-none !text-base placeholder:text-base !font-medium placeholder:font-medium placeholder:text-white disabled:!text-white disabled:opacity-100 disabled:cursor-default disabled:select-text w-full"
          />
        </div>
      </div>
      <div
        className={cn(
          "w-fit ml-auto mt-3 flex items-center gap-3",
          isEditing && "hidden"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "px-4 w-auto border-2 hover:bg-muted flex items-center justify-center"
          )}
          onClick={() => setIsEditing(!isEditing)}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "px-4 w-auto border-2 hover:bg-muted flex items-center justify-center"
          )}
          onClick={() => setIsEditing(!isEditing)}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

function ChatMessageReply() {
  return (
    <div className="mt-7 mb-20">
      <div className="text-white w-fit mr-auto px-2.5 py-2 rounded-md text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
        placeat vero quod vel, beatae, tempora et tempore vitae aliquam
        reiciendis atque soluta! Laudantium quo modi sit doloribus mollitia
        repellendus expedita aspernatur saepe. Fugit, necessitatibus quam
        officia cumque aut itaque laborum exercitationem, qui incidunt ut animi
        vel facilis! Animi, cum explicabo sapiente molestiae nisi magnam non nam
        sed
      </div>
    </div>
  );
}
