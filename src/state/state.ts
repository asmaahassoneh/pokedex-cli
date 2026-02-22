import { createInterface, type Interface } from "node:readline";
import { getCommands } from "../commands/index.js";
import { PokeAPI } from "../api/pokeapi.js";
import type { Pokemon } from "../api/pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;

  pokedex: Record<string, Pokemon>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const state: State = {
    rl,
    commands: {} as Record<string, CLICommand>, 
    pokeAPI: new PokeAPI(),
    nextLocationsURL: null,
    prevLocationsURL: null,
    pokedex: {},
  };

  state.commands = getCommands();

  return state;
}