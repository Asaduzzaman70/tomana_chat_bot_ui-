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
import { Plus, MoreHorizontal, Trash, StarOff } from "lucide-react";
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

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
          <div className="container max-w-4xl mx-auto bg-slate-900">
            <h1 className="text-2xl font-bold mb-4">
              Welcome to the Dashboard
            </h1>
            <p>
              This is your main content area. Click on sidebar items to
              navigate.
            </p>
            <div className="container max-w-4xl mx-auto fixed bottom-10 border-2 rounded-xl p-2">
              <Textarea className="min-h-auto max-h-[70lvh] border-none select-none focus-visible:ring-0 resize-none" />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
    </div>
  );
}

export default App;

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
