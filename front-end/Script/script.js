//MENU SECUNDÁRIO
function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

//NIGHT MODE
const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) => 
    window
      .getComputedStyle(element)
      .getPropertyValue(style)

const initialColors = {                                           //Setando as cores iniciais
  bg: getStyle(html, "--bg"),
  bgs: getStyle(html, "--bgs"),
  card: getStyle(html, "--card"),
  text: getStyle(html, "--text"),
  shadow: getStyle(html, "--shadow"),

  black: getStyle(html, "--black"),
  white: getStyle(html, "--white"),
}

const nightMode = {                                               //Setando as cores do night mode
  bg: "black",
  bgs: "#333333",
  card: "#434343",
  text: "white",
  shadow: "transparent",

  black: "white",
  white: "black"
}

const doExistLocalStorage = (key) =>
  localStorage.getItem(key) != null

const createOrEditLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value))

const getValueLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key))

const transformKey = Key =>
  "--" + Key.replace(/([A/Z])/, "-$1").toLowerCase()

const changeColors = (colors) => {                                  //Mudando as cores
  Object.keys(colors).map(key => 
      html.style.setProperty(transformKey(key), colors[key]) 
  )
}

checkbox.addEventListener("change", ({target}) => {
  if(target.checked) 
  {
    changeColors(nightMode) 
    createOrEditLocalStorage('modo', 'nightMode')
  }  
  else
  {
    changeColors(initialColors)
    createOrEditLocalStorage('modo','initialColors')
  }
})

if(!doExistLocalStorage('modo'))
  createOrEditLocalStorage('modo', 'initialColors')

if(getValueLocalStorage('modo') === 'initialColors')
{
  checkbox.removeAttribute('checked')
  changeColors(initialColors)
}
else
{
  checkbox.setAttribute('checked', "")
  changeColors(nightMode)
}