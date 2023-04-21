document.getElementById("menu-btn").addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("display-none");
})

async function getAllEntries() {
  const endpoint = new URL(`https://haikus.drew-sarette.repl.co/entries`);
  const response = await fetch(endpoint);
  const result = await response.json();
  return result.data;
}

async function showHaikus() {
  let haikus = await getAllEntries()
  const lis = haikus.map(h => makeLi(h));
  document.getElementById("haiku-list").innerHTML = null;
  document.getElementById("haiku-list").append(...lis);
}

showHaikus();

function formatDate(date) {
  date = new Date(date);
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
}

function makeLi(haiku) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <button type="button" class="delete-button">x</button>
    <h2 class="title">${haiku.title}</h2>
    <p class="author">by ${haiku.author}</p>
    <p class="date">on ${formatDate(haiku.date)}</p>
    <p class="line-1">${haiku.haikuAs3Strings.lineOne}</p>
    <p class="line-2">${haiku.haikuAs3Strings.lineTwo}</p>
    <p class="line-3">${haiku.haikuAs3Strings.lineThree}</p>
  `;
  listItem.classList.add("haiku-li");
  listItem.querySelector("button").addEventListener("click", async function() {
    if (!confirm(`Would you like to delete ${haiku.title}?`)){
      return;
    }
    const endpoint = new URL(`https://haikus.drew-sarette.repl.co/entries/${haiku._id}`);
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await fetch(endpoint, options);
      document.getElementById("haiku-list").removeChild(listItem);
    }
    catch {
      alert(`Unable to delete ${haiku.title}. Please try again later`);
    }
    
  })
  return listItem;
}