import fs from "fs";
import axios from "axios";

const leagues = [
  "English Premier League",
  "Spanish La Liga",
  "Italian Serie A",
  "German Bundesliga",
  "French Ligue 1",
  "UEFA Champions League",
  "Major League Soccer",
  "Brazilian Serie A",
  "Dutch Eredivisie",
  "Belgian Pro League",
  "Portuguese Primeira Liga",
];

async function fetchTeamsForLeague(league) {
  const url = `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${encodeURIComponent(
    league
  )}`;
  const res = await axios.get(url);
  const data = res.data;

  return (
    data.teams?.map((t) => ({
      id: t.idTeam,
      name: t.strTeam,
      shortName: t.strTeamShort || null,
      badge: t.strBadge || null,
    })) || []
  );
}

async function main() {
  const allTeams = [];

  for (const league of leagues) {
    console.log(`Fetching ${league}...`);
    const teams = await fetchTeamsForLeague(league);
    allTeams.push(...teams);
  }

  // Deduplicate by team name
  const seen = new Set();
  const uniqueTeams = allTeams.filter((team) => {
    const key = team.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  fs.writeFileSync(
    "./data/teams.json",
    JSON.stringify(uniqueTeams, null, 2),
    "utf-8"
  );

  console.log(
    `✅ Saved ${uniqueTeams.length} unique teams with badges to data/teams.json`
  );
}

main();
