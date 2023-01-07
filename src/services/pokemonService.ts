import { apiPokemonSpecies, apiGetListPokemons, apiGetPokemon, apigeTypes } from '../api/pokemon';
interface DescriptionPokemon{
    text:string
    version:string
}
const getDescriptionsPokemon = (flavor_text_entries:any[] ):DescriptionPokemon[]=>{
    const comments_es = flavor_text_entries.filter((texto:any)=>{
      if(texto.language.name == "es"){
        return true;
      }
      return false;
    })
    const response = comments_es.map((texto:any)=>{
        return {
            text:texto.flavor_text,
            version:texto.version.name
        }
    })
    return response;
}



const getListPokemon = async()=>{
    const response = await apiGetListPokemons();
    const pokemonsLink:any[] = response.results;
    const pokemons = []
    for(let i = 0;i<pokemonsLink.length;i++){
        const pokemon = await apiGetPokemon(pokemonsLink[i].name);
        const {id,abilities,base_experience,height,location_area_encounters,name,species,sprites,stats,types} = pokemon;
        const sprite = sprites.versions["generation-v"]["black-white"].animated.front_default||sprites.other.home.front_default||sprites.other.dream_world.front_default||sprites.other["official-artwork"].front_default ||sprites.front_default;
        const image = sprites.other.home.front_default;
        const pokemonSpecies = await apiPokemonSpecies(id)
        const evolution_chain = pokemonSpecies.evolution_chain;
        const description =  getDescriptionsPokemon(pokemonSpecies.flavor_text_entries);
        const abilitiesName = abilities.map((abilitie:any)=>abilitie.ability.name)
        const color = pokemonSpecies.color.name;
        const egg_groups = pokemonSpecies.egg_groups.map((group:any)=>group.name);

        
        pokemons.push({
            id,
            description:description[0].text,
            color,
            egg_groups,
            image,
            abilities:abilitiesName,
            base_experience,
            height,
            location_area_encounters,
            name,
            species,
            sprite,
            stats,
            types
        });
    }
    return {
        count:response.count,
        next:response.next,
        previous:response.previous,
        data:pokemons
    };
}

export const getTypes = async()=>{
    const response = await apigeTypes();
    return response;
}


const testPokemon =async ()=>{
    const data = await getListPokemon();
    return data;
 
}

export const pokemonService = testPokemon;