(async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2');
    const json = await res.json();
  
    console.log(json.results);
})();