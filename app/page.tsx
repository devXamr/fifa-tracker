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
import { createClient } from "@supabase/supabase-js";

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
  const [firstTeamWins, setFirstTeamWins] = useState(0);
  const [secondTeamWins, setSecondTeamWins] = useState(0);
  const [numTies, setNumTies] = useState(0);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [allMatches, setAllMatches] = useState<SingleFixtureType[]>([]);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    initialSyncUp();
  }, []);

  // fetches data from supabase after the first render
  async function initialSyncUp() {
    const response = await supabase.from("everything").select();

    console.log("Here's the data that supabase has sent back", response.data);

    if (response.data) {
      setAllMatches(response.data[0].allMatches);
      console.log(
        "first team wins (from supabase): ",
        response.data[0].team1wins
      );
      setFirstTeamWins(Number(response.data[0].team1wins));
      setSecondTeamWins(Number(response.data[0].team2wins));
      setNumTies(Number(response.data[0].numDraws));
      console.log("Here's the data: ", response.data[0]);

      console.log("This is after the data was fetched");
    }

    console.log("Data synced up! Good to go.");
  }

  function syncFirstTeamName(teamName: string) {
    setFirstTeamName(teamName);
  }

  function syncSecondTeamName(teamName: string) {
    setSecondTeamName(teamName);
  }

  useEffect(() => {
    async function updateFirstRow() {
      const { error } = await supabase
        .from("everything")
        .update({
          team1wins: String(firstTeamWins),
          team2wins: String(secondTeamWins),
          numDraws: String(numTies),
          allMatches: allMatches,
        })
        .eq("id", 1); // 👈 assuming your only row has id = 1

      if (error) {
        console.error("Error updating row:", error);
      } else {
        console.log("Updated first row successfully!");
      }
    }

    if (allMatches.length > 0) updateFirstRow();
  }, [allMatches]);

  function handleFormSubmission() {
    console.log("New match was added.");

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
    const currentGameWinner =
      firstTeamScore > secondTeamScore ? "team1" : "team2";
    const isTie = firstTeamScore === secondTeamScore;

    if (isTie) {
      setNumTies((prev) => prev + 1);
    } else if (currentGameWinner === "team1") {
      setFirstTeamWins((prev) => prev + 1);
    } else {
      setSecondTeamWins((prev) => prev + 1);
    }

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
      <div className="border-b border-gray-200 sticky top-0 bg-white z-10 rounded-b-sm">
        <div className="grid grid-cols-3 ">
          <div className="w-fit mx-auto px-2 pb-5">
            <div className="text-center">Ammar</div>
            <div
              className={`text-4xl px-3 py-3 ${
                firstTeamWins > secondTeamWins ? "bg-green-200" : "bg-red-200"
              } text-gray-800 text-center rounded-sm mt-1`}
            >
              {firstTeamWins}
            </div>
          </div>
          <div className="w-fit mx-auto mt-5 ">
            <div className="text-center">vs</div>
            <div className="text-xs text-gray-900">
              <div className="text-center">Draws</div>
              <div className="text-center">{numTies}</div>
            </div>
          </div>
          <div className="w-fit mx-auto">
            <div className="text-center">Basil</div>
            <div
              className={`text-4xl ${
                secondTeamWins > firstTeamWins ? "bg-green-200" : "bg-red-200"
              } rounded-sm mt-1 text-center text-gray-800 px-3 py-3`}
            >
              {secondTeamWins}
            </div>
          </div>
        </div>

        <Popover
          onOpenChange={() => setIsPopoverOpen((prev) => !prev)}
          open={isPopoverOpen}
        >
          <PopoverTrigger className="border mb-2 w-fit px-5 py-1 rounded-md text-sm mx-auto block">
            {isPopoverOpen ? "Close" : "Add Match"}
          </PopoverTrigger>
          <PopoverContent>
            <div className="mb-4 text-sm">Add Match</div>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                handleFormSubmission();
                setIsPopoverOpen(false);
              }}
            >
              <div>
                <div className="text-sm mb-1">Select first team</div>
                <TeamSelectionCombobox
                  changeHandlerFunction={syncFirstTeamName}
                />
                <div className="text-sm mb-1 mt-3">FT Score</div>
                <input
                  type="text"
                  required
                  onChange={(e) => setFirstTeamScore(e.target.value)}
                  className="outline-1 rounded-md py-1"
                />
              </div>

              <div className="mt-5">
                <div className="text-sm mb-1">Select second team</div>
                <TeamSelectionCombobox
                  changeHandlerFunction={syncSecondTeamName}
                />
                <div className="text-sm mb-1 mt-3">FT Score</div>
                <input
                  type="text"
                  required
                  onChange={(e) => setSecondTeamScore(e.target.value)}
                  className="outline-1 rounded-md py-1 mb-5"
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
        <SingleFixture key={Math.random()} data={each} />
      ))}
    </div>
  );
}
