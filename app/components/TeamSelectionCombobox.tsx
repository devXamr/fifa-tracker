"use client";

import * as React from "react";
import { teamInfo } from "../data/teamData";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type TeamSelectionComboboxProps = {
  changeHandlerFunction: (teamName: string) => void;
};

export function TeamSelectionCombobox({
  changeHandlerFunction,
}: TeamSelectionComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    changeHandlerFunction(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="font-primary">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-[#1E1E1E] outline-[#333333] border-[#333333]"
        >
          {value
            ? teamInfo.find((team) => team.name === value)?.name
            : "Select team..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 border-[#2C2C2C] bg-[#181818] outline-[#2C2C2C] shadow-lg">
        <Command className="border-[#2C2C2C] border-b  bg-[#181818] text-white outline-[#2C2C2C]">
          <CommandInput
            placeholder="Search team..."
            className="border-b border-[#2C2C2C] outline-0"
          />
          <CommandList className="bg-[#181818]   text-white">
            <CommandEmpty>No Team Found.</CommandEmpty>
            <CommandGroup>
              {teamInfo.map((eachTeam) => (
                <CommandItem
                  key={eachTeam.id}
                  value={eachTeam.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center text-white cursor-pointer transition-colors selection:bg-red-300",
                    value === eachTeam.name
                      ? "bg-[#1F6F54] text-white" // ✅ selected color
                      : "hover:bg-[#242424]" // ✅ hover color
                  )}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4 text-white",
                      value === eachTeam.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {eachTeam.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
