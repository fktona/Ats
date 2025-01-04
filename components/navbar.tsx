import React from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="relative w-full">
      <div className="w-full flex justify-between items-center gap-12  md:px-[32px] py-5 border-b-0 md:border-b border-white/5">
        <div className="flex  items-center space-x-2">
          <Image
            alt="logo"
            src="/logo.svg"
            width={50}
            height={50}
            className="w-10 aspect-square md:w-16"
          />
          <h2 className="font-bold flex flex-col font-random text-[30px] ">
            Atsagent
            <sub className="text-[10px] text-[#B0B0B0] font-normal">
              Automated Token Scanner
            </sub>
          </h2>
        </div>
        <div className="relative  hidden md:flex grow lg:max-w-[600px] ">
          <Search className="absolute left-2 top-[14px]" size={16} />
          <Input
            className=" p-2 pl-8 py-3 rounded-full  bg-white/5 w-full  border border-white/5"
            placeholder="Search"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size={"icon"}
            variant={"ghost"}
            asChild
            className="bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white/30 transition-colors duration-150"
          >
            <Image
              alt="x"
              src="/x.svg"
              width={25}
              height={25}
              className="w-8 h-8 relative "
            />
          </Button>
          <Button
            size={"icon"}
            variant={"ghost"}
            asChild
            className="bg-white/20 p-2 rounded-full z-20 relative cursor-pointer hover:bg-white/30 transition-colors duration-150"
          >
            <Image
              alt="pump fun"
              src="/pump.svg"
              width={25}
              height={25}
              className="w-8 h-8 relative cusor-pointer"
            />
          </Button>
        </div>
      </div>
      <div className="w-full flex justify-between items-center md:hidden gap-6 py-5 md:border-b-0 ">
        <Button size="icon" className="cusor-pointer">
          <Image alt="menu" src="/menu.svg" width={30} height={30} />
        </Button>
        <div className="relative  md:hidden flex w-full ">
          <Search className="absolute left-2 top-[14px]" size={16} />
          <Input
            className=" p-2 pl-8 py-2 rounded-full  bg-white/5 w-full  border border-white/5"
            placeholder="Search"
          />
        </div>
      </div>
    </nav>
  );
}
