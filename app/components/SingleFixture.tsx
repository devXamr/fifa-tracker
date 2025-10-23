import { teamInfo } from "../data/teamData";

type SingleFixtureProps = {
  team1badge: string;
  team2badge: string;
  team1name: string;
  team2name: string;
  team1score: string;
  team2score: string;
  date: string;
};

export default function SingleFixture({ data }: { data: SingleFixtureProps }) {
  const url1 = data.team1badge;
  const url2 = data.team2badge;

  const team1ShortName = teamInfo.filter(
    (teams) => teams.name === data.team1name
  )[0].shortName;

  const team2ShortName = teamInfo.filter(
    (teams) => teams.name === data.team2name
  )[0].shortName;

  console.log("team1shortname: ", team1ShortName);
  console.log("team2shortname: ", team2ShortName);

  console.log("This is the first team;s score", data.team1score);

  const isEqual = data.team1score === data.team2score;
  const winner = data.team1score > data.team2score ? "team1" : "team2";

  console.log("is team 1 the winner? ", data.team1score > data.team2score);
  console.log("is it equal?", data.team1score === data.team2score);
  return (
    <div className="border rounded-xs border-[#2E2E2E] text-[#FFFFFF] bg-[#1A1A1A] mt-1.5 py-2 px-2 relative mx-3 font-primary">
      <div
        className={`absolute  bg-[#2B2B2B]  ${
          !isEqual && winner === "team1" && "bg-[#143C2E]"
        } ${
          !isEqual && winner === "team2" && "bg-red-100"
        } w-[50%] h-full -z-1 left-0 top-0`}
      ></div>
      <div
        className={`absolute ${
          !isEqual && winner === "team2" && "bg-[#143C2E]"
        } ${
          !isEqual && winner === "team1" && "bg-red-100"
        }   bg-[#2B2B2B] w-[50%] h-full -z-1 right-0 top-0`}
      ></div>

      <div className="flex justify-between mb-2 border-b-[0.1px] border-dashed border-[#2E2E2E] pb-1">
        <div>
          <div className="text-[11px] text-[#B0B0B0]">{data.date}</div>
        </div>
        <div>
          <div className="text-[11px] text-[#B0B0B0]">FIFA20</div>
        </div>
      </div>
      <div className="grid grid-cols-7 overflow-hidden">
        <div className="col-span-3 grid grid-cols-2">
          <div
            lang="en"
            className="text-right text-xs mt-2 wrap-break-word hyphens-auto"
          >
            {data.team1name}
          </div>
          <img
            src={url1}
            alt="logo"
            width={50}
            height={50}
            className="w-10 h-10 mx-auto"
          />
        </div>

        <div className="text-center text-sm col-span-1 rounded-sm mt-1 bg-[#1F1F1F]  border-[#2E2E2E] border h-fit divide-x-2">
          <div className="py-1 h-fit px-2 flex justify-between ">
            <div className="font-medium">{data.team1score} </div>
            <div className="text-xs mt-0.5 text-gray-700">|</div>
            <div className="font-medium">{data.team2score}</div>
          </div>
        </div>

        <div className="col-span-3 grid grid-cols-2">
          <img
            src={url2}
            alt="logo"
            width={50}
            height={50}
            className="w-10 h-10 mx-auto"
          />
          <div
            lang="en"
            className="text-left text-xs mt-2 hyphens-auto wrap-break-word"
          >
            {data.team2name}
          </div>
        </div>
      </div>
    </div>
  );
}
