"use client";

import Image from "next/image";
import { teamInfo } from "../app/data/teamData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TeamSelectionCombobox } from "./components/TeamSelectionCombobox";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SingleFixture from "./components/SingleFixture";

type SingleFixtureType = {
  team1badge: string;
  team2badge: string;
  team1name: string;
  team2name: string;
  team1score: string;
  team2score: string;
  date: string;
};

export default function Home() {
  const [firstTeamName, setFirstTeamName] = useState("");
  const [secondTeamName, setSecondTeamName] = useState("");
  const [firstTeamScore, setFirstTeamScore] = useState("");
  const [secondTeamScore, setSecondTeamScore] = useState("");

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [allMatches, setAllMatches] = useState<SingleFixtureType[]>([]);

  function syncFirstTeamName(teamName: string) {
    setFirstTeamName(teamName);
  }

  function syncSecondTeamName(teamName: string) {
    setSecondTeamName(teamName);
  }

  function handleFormSubmission() {
    console.log("The form was submitted");

    /*
    type SingleFixtureProps = {
  team1badge: string;
  team2badge: string;
  team1name: string;
  team2name: string;
  team1score: string;
  team2score: string;
  date: string;
};
    */

    const team1info = teamInfo.filter((team) => team.name === firstTeamName);
    const team2info = teamInfo.filter((team) => team.name === secondTeamName);

    console.log("team1 info", team1info);
    console.log("team2 info", team2info);

    const date = new Date();

    const data = {
      team1badge: team1info[0].badge,
      team2badge: team2info[0].badge,
      team1name: team1info[0].name,
      team2name: team2info[0].name,
      team1score: firstTeamScore,
      team2score: secondTeamScore,
      date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
    };

    setAllMatches((prev) => [data, ...prev]);

    setFirstTeamName("");
    setSecondTeamName("");
    setFirstTeamScore("");
    setSecondTeamScore("");
  }

  useEffect(() => {
    console.log("ALL MATCHES", allMatches);
  }, [allMatches]);

  return (
    <div className=" py-5 relative h-screen overflow-scroll">
      <div className="border-b border-gray-200 sticky top-0 bg-white rounded-b-sm">
        <div className="grid grid-cols-3 ">
          <div className="w-fit mx-auto px-2 pb-5">
            <div className="text-center">Ammar</div>
            <div className="text-4xl px-3 py-3 bg-green-200 text-gray-800 rounded-sm mt-1">
              50
            </div>
          </div>
          <div className="w-fit mx-auto mt-5 ">vs</div>
          <div className="w-fit mx-auto">
            <div className="text-center">Basil</div>
            <div className="text-4xl bg-red-200 rounded-sm mt-1 text-gray-800 px-3 py-3">
              45
            </div>
          </div>
        </div>

        <Popover
          onOpenChange={() => setIsPopoverOpen((prev) => !prev)}
          open={isPopoverOpen}
        >
          <PopoverTrigger className="border mb-2 w-fit px-5 py-1 rounded-md text-sm mx-auto block">
            Add Match
          </PopoverTrigger>
          <PopoverContent>
            Place content for the popover here.
            <form
              onSubmit={(e) => {
                e.preventDefault();

                handleFormSubmission();
                setIsPopoverOpen(false);
              }}
            >
              <div>
                <div>Select first team</div>
                <TeamSelectionCombobox
                  changeHandlerFunction={syncFirstTeamName}
                />
                <div>FT Score</div>
                <input
                  type="text"
                  required
                  onChange={(e) => setFirstTeamScore(e.target.value)}
                />
              </div>

              <div>
                <div>Select second team</div>
                <TeamSelectionCombobox
                  changeHandlerFunction={syncSecondTeamName}
                />
                <div>FT Score</div>
                <input
                  type="text"
                  required
                  onChange={(e) => setSecondTeamScore(e.target.value)}
                />
              </div>

              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </div>

      {allMatches.map((each) => (
        <SingleFixture data={each} />
      ))}
    </div>
  );
}
