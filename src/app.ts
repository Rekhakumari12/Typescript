const container: HTMLElement | any = document.getElementById("app")
const userInput: HTMLLIElement | any = document.getElementById("userInput")
const notFount: HTMLLIElement | any = document.getElementById("not-found")
userInput.addEventListener("input", function () {
  findData(userInput.value)
})
let pokes: string[]=[];
const Pokemons: number = 20;
interface pokemonShape{
  id: number;
  name: string;
  image: string;
  type: string;
}
const fetchData=():void => {
  for (let i = 1; i < Pokemons; i++){
      getPokemon(i)
  }
}

const getPokemon = async (id: number): Promise<void> => {
  const response: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const pokemon: any = await response.json()
  const pokemonType: string = pokemon.types.map((poke: any) => poke.type.name).join(', ')
  pokes.push(pokemon.name+" "+pokemon.id)
  const transformedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: `${ pokemon.sprites.other.dream_world.front_default }`,
    type:pokemonType
  }
  showPokemon(transformedPokemon)
}

const showPokemon = (pokemon: pokemonShape): void => {
  let output: string = `
    <div class="card">
      <span class="card--id">${pokemon.id}</span>
      <img src="${pokemon.image}" class="card--image" alt="${pokemon.name}"/>
      <h1 class="card--name">${pokemon.name}</h1>
      <span class="card--details">${pokemon.type}</span>
    </div>
  `
  container.innerHTML += output
}
const findData = (poke: string) => {
  let res = pokes.filter((item) => {
    return item.includes(poke)
  })
  let setArr: Set<string> = new Set(res)
  let filteredPokemon = Array.from(setArr);
  if (filteredPokemon.length !== 0) {
    for (let i of filteredPokemon) {
      let a = i.split(" ")
      container.innerHTML = ''
      getPokemon(Number(a[1]))
    }
  } else {
    container.innerHTML="<h2>Result not found :(</h2>"
  }
}
fetchData()
