

async function getAllEntries() {
  const endpoint = new URL(`https://haikus.drew-sarette.repl.co/entries`);
  const response = await fetch(endpoint);
  const result = await response.json();
  return result.data;
}