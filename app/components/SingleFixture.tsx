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

  console.log("This is the first team;s score", data.team1score);

  const isEqual = data.team1score === data.team2score;
  const winner = data.team1score > data.team2score ? "team1" : "team2";

  console.log("is team 1 the winner? ", data.team1score > data.team2score);
  console.log("is it equal?", data.team1score === data.team2score);
  return (
    <div className="border rounded-md border-gray-300 shadow-sm mt-5 py-2 px-2 relative mx-3">
      <div
        className={`absolute bg-gray-100  ${
          !isEqual && winner === "team1" && "bg-green-100"
        } ${
          !isEqual && winner === "team2" && "bg-red-100"
        } w-[50%] h-full -z-1 left-0 top-0`}
      ></div>
      <div
        className={`absolute ${
          !isEqual && winner === "team2" && "bg-green-100"
        } ${
          !isEqual && winner === "team1" && "bg-red-100"
        }   bg-gray-100 w-[50%] h-full -z-1 right-0 top-0`}
      ></div>

      <div className="flex justify-between mb-2 border-b border-dashed border-gray-300 pb-1">
        <div>
          <div className="text-xs text-gray-500">Date</div>
          <div className="text-sm text-gray-900">{data.date}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 text-right">Game</div>
          <div className="text-sm text-gray-900">FIFA20</div>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div>
          <img
            src={url1}
            alt="logo"
            width={50}
            height={50}
            className="w-12 mx-auto"
          />

          <div className="text-center text-sm mt-2 text-gray-900">
            {data.team1name}
          </div>
        </div>

        <div className="text-center text-xl">
          <div className="py-2">
            {data.team1score} - {data.team2score}
          </div>
        </div>

        <div>
          <img
            src={url2}
            alt="logo"
            width={50}
            height={50}
            className="w-12 mx-auto"
          />
          <div className="text-center text-sm mt-2 text-gray-900">
            {data.team2name}
          </div>
        </div>
      </div>
    </div>
  );
}
