import type { State } from "./state.js";

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export async function commandCatch(
  state: State,
  pokemonName?: string
): Promise<void> {
  if (!pokemonName) {
    console.log("Usage: catch <pokemon-name>");
    return;
  }

  const name = pokemonName.toLowerCase();

  console.log(`Throwing a Pokeball at ${name}...`);

  const pokemon = await state.pokeAPI.fetchPokemon(name);


  const baseExp = pokemon.base_experience ?? 0;
  const chance = clamp(1 - baseExp / 400, 0.15, 0.85);

  const roll = Math.random();
  const caught = roll < chance;

  if (!caught) {
    console.log(`${name} escaped!`);
    return;
  }

  state.pokedex[name] = pokemon;
  console.log(`${name} was caught!`);
}