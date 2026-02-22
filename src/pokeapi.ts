import { Cache } from "./pokecache.js";

export type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: PokemonStat[];
  types: PokemonType[];
};

export type NamedAPIResource = {
  name: string;
  url: string;
};

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
};

export type Location = {
  id: number;
  name: string;
  pokemon_encounters: Array<{
    pokemon: NamedAPIResource;
    version_details: unknown[];
  }>;
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cache?: Cache) {
    this.cache = cache ?? new Cache(5 * 60 * 1000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) {
      return cached;
    }

    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      throw new Error(`PokeAPI error: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as ShallowLocations;
    this.cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.cache.get<Location>(url);
    if (cached) {
      return cached;
    }

    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      throw new Error(`PokeAPI error: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as Location;
    this.cache.add(url, data);
    return data;
  }
  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cached = this.cache.get<Pokemon>(url);
    if (cached) return cached;

    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      throw new Error(`PokeAPI error: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as Pokemon;
    this.cache.add(url, data);
    return data;
  }
}