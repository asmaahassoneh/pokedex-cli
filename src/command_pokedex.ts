import type { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
  const caught = Object.keys(state.pokedex);

  console.log("Your Pokedex:");

  if (caught.length === 0) {
    return;
  }

  for (const name of caught) {
    console.log(` - ${name}`);
  }
}
