import type { State } from "../state/state.js";

export async function commandInspect(
  state: State,
  pokemonName?: string
): Promise<void> {
  if (!pokemonName) {
    console.log("Usage: inspect <pokemon-name>");
    return;
  }

  const name = pokemonName.toLowerCase();
  const pokemon = state.pokedex[name];

  if (!pokemon) {
    console.log("you have not caught that pokemon");
    return;
  }

  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);

  console.log("Stats:");
  for (const s of pokemon.stats) {
    console.log(`  -${s.stat.name}: ${s.base_stat}`);
  }

  console.log("Types:");
  for (const t of pokemon.types) {
    console.log(`  - ${t.type.name}`);
  }
}