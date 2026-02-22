import type { State } from "./state.js";

export async function commandExplore(
  state: State,
  locationName?: string
): Promise<void> {
  if (!locationName) {
    console.log("Usage: explore <location-area-name>");
    return;
  }

  console.log(`Exploring ${locationName}...`);

  const location = await state.pokeAPI.fetchLocation(locationName);

  console.log("Found Pokemon:");

  for (const encounter of location.pokemon_encounters) {
    console.log(` - ${encounter.pokemon.name}`);
  }
}