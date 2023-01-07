import { pokemonApi } from "./axios.config";

export const apiPokemonSpecies=async (id:number)=>{
    const data = await pokemonApi.get(`/pokemon-species/${id}`)
    return data.data;
}

export const apiGetListPokemons = async()=>{
    const data = await pokemonApi.get('/pokemon');
    return data.data;
}

export const apiGetPokemon = async(id:number|string)=>{
    const data = await pokemonApi.get(`/pokemon/${id}`)
    return data.data;
}
export const apigeTypes = async()=>{
    const data = await pokemonApi.get(`/type`);
    return data.data
}