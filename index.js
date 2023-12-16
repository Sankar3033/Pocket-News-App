window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    category="TamilNadu";
    api1call();
    category="cricket";
    url=`https://newsdata.io/api/1/news?apikey=${KEY}&q=${category}`;
    api1call();
    api2call();
  });
//Menubar
const menuicon =document.querySelector("#menuicon")
const closeicon =document.querySelector("#closeicon")
const menu =document.querySelector(".menuitems")
function menubutton(){
    menuicon.style.display = "none";
    closeicon.style.display = "flex";
    menu.classList.add('active')
}
function closebutton(){
    menuicon.style.display = "flex";
    closeicon.style.display = "none";
    menu.classList.remove('active')
}
//Color Mode
let clicked = true; 
var r = document.querySelector(':root');
const content =document.querySelector(".content")
function myFunction(){
    if(clicked){
        r.style.setProperty('--white', 'rgb(240, 240, 240)');
        r.style.setProperty('--black', '#000000');
        r.style.setProperty('--blue', 'rgb(240, 240, 240)');
        content.style.backgroundcolor = "black";
        clicked=false;
    }
    else{
        r.style.setProperty('--white', '#000000');
        r.style.setProperty('--black', 'rgb(180, 180, 180)');
        r.style.setProperty('--blue', '#0e0e0e');
        content.style.backgroundcolor = "rgb(240, 240, 240)";
        clicked=true;
    }
}
//API1 Handling
let newSearch=true;
let erroractive=false;
const KEY = "pub_347224a186d424040801284ab2893bea62872"
let query="Tamilnadu";
let url=`https://newsdata.io/api/1/news?apikey=${KEY}&q=${query}`;
async function APIfetch(url){
    const res = await fetch(url);
    let data = res.json();
    let data1 = await data;
    updateData(data1.results)
}
function updateData(articles) {
    const cardsContainer = document.querySelector(".maincontent")
    const Template = document.getElementById("template");
    console.log(articles);
    if(articles==undefined) return;
    if(articles.length===0 ){
        console.log("Error");
        return;
    }
    if(newSearch){
        cardsContainer.innerHTML = "";
        newSearch=false;
    }
    articles.forEach((article) => {
        const cardClone = Template.content.cloneNode(true);
        createCard(cardClone, article);
        if(!article.content) return;
        if(!article.image_url) return;
        cardsContainer.appendChild(cardClone);
    });
}
function createCard(cardClone,article){
    const Image = cardClone.querySelector(".card>img");
    const Title = cardClone.querySelector(".title");
    const Source = cardClone.querySelector(".news-source");
    const Desc = cardClone.querySelector(".news-desc");
    Image.src = article.image_url;
    Title.innerHTML = article.title;
    Desc.innerHTML = article.content.slice(0,600)+"......";
    let date = new Date(article.pubDate).toLocaleString("en-US", {timeZone: "Asia/Jakarta" });
    Source.innerHTML = `${article.source_id} · ${date}`;
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.link, "_blank");
    });
}
//CORS Image loading Problem 
function errorimage(res,parent){
    let parentelement = parent;

    const cardsContainer = document.querySelector(".maincontent");
    cardsContainer.removeChild(parent)
    cardsContainer.appendChild(parentelement);

    let randomImg=Math.floor(Math.random()*10)+1;
    res.src=`./Images/${randomImg}.jpg`;
    console.log(res)
    //res.style.display="none";
}

//searchbar
const searchbar = document.querySelector(".searchbar>input");
function searchfunc(){
    query = searchbar.value;
    url=`https://newsdata.io/api/1/news?apikey=${KEY}&q=${query}`;
    api1call(url);
}
window.addEventListener('keydown',(event)=>{
    if(event.key=='Enter'){
        console.log(event.key)
        searchfunc();
    } 
});

//API2 handling
const KEY2 = "fda15a9b405b4f5dbfe999d756eca74c"
let country = "in";
let category = "Sports"
let url2=`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${KEY2}`;
async function APIfetch2(ur){
    const res = await fetch(ur);
    let data = res.json();
    let data1 = await data;
    updateData1(data1.articles)
}
function updateData1(articles) {
    const cardsContainer = document.querySelector(".maincontent")
    const Template = document.getElementById("template");
    if(newSearch){
        cardsContainer.innerHTML = "";
        newSearch=false;
    }
    if(articles==undefined) return;
    articles.forEach((article) => {
        const cardClone = Template.content.cloneNode(true);
        createCard2(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
function createCard2(cardClone,article){
    const Image = cardClone.querySelector(".card>img");
    const Title = cardClone.querySelector(".title");
    const Source = cardClone.querySelector(".news-source");
    const Desc = cardClone.querySelector(".news-desc");
    Image.src = article.urlToImage;
    Title.innerHTML = article.title;
    Desc.innerHTML = article.description;
    let date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta" });
    Source.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}
//options category handling
const cat = document.querySelector("#Categories")
const catarr=["Breakingnews","business","entertainment","general","sports","technology"]
function onSelectChanged2()
{
    console.log(cat.selectedIndex);
    category = catarr[cat.selectedIndex];
    url2=`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${KEY2}`;
    api2call();
    if(category=="sports"){
        category=cricket;
        url=`https://newsdata.io/api/1/news?apikey=${KEY}&q=${category}`;
        api1call();
        category=football;
        url=`https://newsdata.io/api/1/news?apikey=${KEY}&q=${category}`;
        api1call();
        return;
    }
    category = catarr[cat.selectedIndex];
    url=`https://newsdata.io/api/1/news?apikey=${KEY}&q=${category}`;
    api1call();
}   
if (cat.addEventListener) cat.addEventListener('change', onSelectChanged2, false);
else cat.attachEvent('onchange', onSelectChanged2, false);


//Option country handling
const count = document.querySelector("#Country")
const countarr=["in","us","gb","ar","pt","il","cn"];
const countNamesarr=["India","America","England","Argentina","Portugal","Israel","China"];
function onSelectChanged()
{
    console.log(count.selectedIndex);
    country = countarr[count.selectedIndex];
    url2=`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${KEY2}`;
    api2call();
    country = countNamesarr[count.selectedIndex];
    url=`https://newsdata.io/api/1/news?apikey=${KEY}&q=${country}`;
    api1call();
}   
if (count.addEventListener) count.addEventListener('change', onSelectChanged, false);
else count.attachEvent('onchange', onSelectChanged, false);

//Api1 Call
function api1call(){
    newSearch=true;
    APIfetch(url);
}
function api2call(){
    newSearch=true;
    APIfetch2(url2);
}
