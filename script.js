const form = document.getElementById("form");
const input = document.getElementById("search");
const definition = document.getElementById("definition");
const hideBtn = document.getElementById("hideBtn");
const showBtn = document.getElementById("showBtn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!definition.innerText) {
    getDefinition(input.value);
    definition.classList.add("show");
  } else {
    definition.classList.remove("show");
    definition.classList.add("hide");
    setTimeout(() => {
      definition.innerText = "";
      definition.classList.remove("hide");
      getDefinition(input.value);
      definition.classList.add("show");
    }, 1500);
  }
});
function getDefinition(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => {
      return res.json();
    })
    .then((word) => {
      definition.innerText =
        word[0].meanings[0].definitions[0].definition[0].toUpperCase() +
        word[0].meanings[0].definitions[0].definition.slice(1);
    })
    .catch((error) => {
      console.log(error);
      definition.innerText = "Could not find word..";
    });
}
