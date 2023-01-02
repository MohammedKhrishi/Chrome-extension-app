
let listItemsLinks=[];
let btn=document.querySelector(".btn-primary");
let inputSearch=document.getElementById("input-text");
let listItems=document.getElementById("list__items");
let clearAll=document.getElementById("delete-btn");
let tabBtn=document.getElementById("save-tabs-btn");


const GetItemsfromLocalStorage= JSON.parse(localStorage.getItem("listItemsLinks"))
if(GetItemsfromLocalStorage){
    listItemsLinks=GetItemsfromLocalStorage;
    displayItems();
}

btn.addEventListener("click", () => {
        listItemsLinks.push(inputSearch.value);
        inputSearch.value = " ";
        localStorage.setItem("listItemsLinks", JSON.stringify(listItemsLinks))
        displayItems();
    })


clearAll.addEventListener("click", ()=>{
    localStorage.clear();
    listItemsLinks=[];
    displayItems();
})

tabBtn.addEventListener("click", ()=>{
    chrome.tabs.query({active:true, currentWindow:true}, (tabs)=>{
    listItemsLinks.push(tabs[0].url);
    localStorage.setItem("listItemsLinks", JSON.stringify(listItemsLinks))
    displayItems(listItemsLinks)
    })
})
function displayItems(){
    let items="";
    for (let i=0;i< listItemsLinks.length; i++) {
        items +=
        `<li>
            <a target='_blank' href='${listItemsLinks[i]}'>
            ${listItemsLinks[i]}
            </a>
         </li> `;
    }
    listItems.innerHTML = items;
}