import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  const pageURL = state.nextLocationsURL ?? undefined;

  const data = await state.pokeAPI.fetchLocations(pageURL);

  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;

  for (const loc of data.results) {
    console.log(loc.name);
  }
}