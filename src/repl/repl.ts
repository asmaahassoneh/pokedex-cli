import type { State } from "../state/state.js";

export function cleanInput(input: string): string[] {
  return input
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

export function startREPL(state: State) {
  const rl = state.rl;

  rl.prompt();

  rl.on("line", async (line) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const args = words.slice(1); 
    const command = state.commands[commandName];

    if (!command) {
      console.log("Unknown command");
      rl.prompt();
      return;
    }

    try {
      await command.callback(state, ...args); 
    } catch (err) {
      console.log("Error:", err instanceof Error ? err.message : String(err));
    }

    rl.prompt();
  });
}