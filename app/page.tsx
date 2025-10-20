import Image from "next/image";
import { teamInfo } from "../app/data/teamData";

export default function Home() {
  return (
    <div className=" py-5 relative min-h-screen">
      <div className="grid grid-cols-3 border-b border-gray-200 sticky top-0 rounded-b-sm">
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

      <div className="border rounded-md border-gray-300 shadow-sm mt-5 py-2 px-2 relative mx-3">
        <div className="absolute bg-green-100 w-[50%] h-full -z-1 left-0 top-0"></div>
        <div className="absolute bg-red-100 w-[50%] h-full -z-1 right-0 top-0"></div>

        <div className="flex justify-between mb-2 border-b border-dashed border-gray-300 pb-1">
          <div>
            <div className="text-xs text-gray-500">Date</div>
            <div className="text-sm text-gray-900">12/12/20</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 text-right">Game</div>
            <div className="text-sm text-gray-900">FIFA20</div>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div>
            <Image
              src={teamInfo[10].badge}
              alt="logo"
              width={50}
              height={50}
              className="w-12 mx-auto"
            />
            <div className="text-center text-sm mt-2 text-gray-900">
              {teamInfo[10].name}
            </div>
          </div>

          <div className="text-center text-xl">
            <div className="py-2">10 - 7</div>
          </div>

          <div>
            <Image
              src={teamInfo[11].badge}
              alt="logo"
              width={50}
              height={50}
              className="w-12 mx-auto"
            />
            <div className="text-center text-sm mt-2 text-gray-900">
              {teamInfo[11].name}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 w-full">
        <button className="block text-center w-[95%] rounded-md mx-auto inset-x-0 bottom-1 bg-black text-white px-5 py-2">
          Add Match
        </button>
      </div>
    </div>
  );
}
