import { Input } from "@/components/ui/input";
import { Check, RefreshCcw,  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTableToolbar } from "../organism/DataTableToolbar";
import { useState } from "react";

export default function FilterQuestionsBySearch() {

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 ">

      <div className="flex flex-wrap grid-cols-2 md:grid-cols-3 gap-2 ">
        <div
          className="border border-white flex items-center gap-2 pl-2 rounded-lg bg-black cursor-pointer"
        >
          <div>
            <RefreshCcw size={20} className="text-white bg-black p-[.05rem] rounded-full" />
          </div>
          <Button>Refresh</Button>
        </div>

        <div
          className="border border-white flex items-center gap-2 pl-2 rounded-lg bg-black cursor-pointer"
        >
          {/* <div  > */}
            <Check size={20} className="text-white bg-black p05rem] rounded-full" />
          {/* </div> */}
          <Button>Answer</Button>
        </div>

        <div
          className="border border-white flex items-center gap-2 pl-2 rounded-lg bg-black cursor-pointer"
        >
          <div  >
            <Check size={20} className="text-white bg-black p05rem] rounded-full" />
          </div>
          <Button>Describe</Button>
        </div>
      </div>

      {/* <DataTableToolbar table={table} /> */}
      <form className="w-full md:flex-1  ">
        <Input placeholder="Search questions.." />
      </form>
    </div>
  )
}