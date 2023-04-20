document.getElementById("menu-btn").addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("display-none");
})

async function getAllEntries() {
  const endpoint = new URL(`https://haikus.drew-sarette.repl.co/entries`);
  const response = await fetch(endpoint);
  const result = await response.json();
  return result.data;
}

async function showHaikus(){
  let haikus = await getAllEntries()
  const lis = haikus.map(h => makeLi(h));
  document.getElementById("haiku-list").append(...lis);
}

showHaikus();


function makeLi(haiku) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <button type="button">x</button>
    <h2 class="title">${haiku.title}</h2>
    <p class="author">By ${haiku.author}</p>
    <p class="line-1">${haiku.haikuAs3Strings.lineOne}</p>
    <p class="line-2">${haiku.haikuAs3Strings.lineTwo}</p>
    <p class="line-3">${haiku.haikuAs3Strings.lineThree}</p>
    <p class="date">add date later</p>
  `;
  listItem.querySelector("button").addEventListener("click", async function () {
    const endpoint = new URL(`https://haikus.drew-sarette.repl.co/entries/${haiku._id}`);
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(endpoint, options)
  })
  return listItem;
}