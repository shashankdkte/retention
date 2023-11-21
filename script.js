const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const CATEGORIES = [
  { name: "technology", background: "#bae6fd" ,color:'#0369a1'},
  { name: "science", background: "#fef08a" ,color:'#a16207'},
  { name: "finance", background: "#ddd6fe" ,color:'#7e22ce'},
  { name: "society", background: "#4d7c0f" ,color:'#d9f99d'},
  { name: "entertainment", background: "#fbcfe8",color:'#be185d' },
  { name: "health", background: "#a7f3d0",color:'#047857' },
  { name: "history", background: "#fed7aa",color:'#c2410c' },
  { name: "news", background: "#fecdd3",color:'#be123c' },
];


//SELECTING DOM NODES
const btn = document.querySelector('.btn-open');
const form = document.querySelector('.fact-form');
const factsList = document.querySelector('.facts-list')
const catList = document.querySelector('.category-list')
let categoryList = [];
// Create DOM elements: Render facts in list
factsList.innerHTML = "";
catList.innerHTML =""
loadFacts()
async function loadFacts()
{
  const res = await fetch('https://dvicuasxllysfucgagsr.supabase.co/rest/v1/retention_table', {
    headers: {
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2aWN1YXN4bGx5c2Z1Y2dhZ3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1ODM5NTAsImV4cCI6MjAxNjE1OTk1MH0.-hnt3W7wdOcnQqPadN3RLK04MiZD_6mUAYAUtuAdQsk",
      authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2aWN1YXN4bGx5c2Z1Y2dhZ3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1ODM5NTAsImV4cCI6MjAxNjE1OTk1MH0.-hnt3W7wdOcnQqPadN3RLK04MiZD_6mUAYAUtuAdQsk"
    }
  });

  const data = await res.json();
  // console.log(data)
data.forEach(fact => {
  if (!categoryList.includes(fact.category))
  {
    categoryList.push(fact.category)
    }
});
  console.log(categoryList)
 createCategoryList(categoryList)
  createFactsList(data)

}


function createFactsList(dataArray) {
  
  const htmlArr = dataArray.map((fact) => `
  <li class="fact">
              <p>${fact.text}
              <a class="source"
                   href="${fact.source}" target="
                   _blank">(Source)</a>
              </p>
                <span class="tag" style="background-color: ${CATEGORIES.find((cat) => cat.name === fact.category).background};
                 color: ${CATEGORIES.find((cat) => cat.name === fact.category).color}">${fact.category}</span>
              <div class="vote-buttons">
                <button>👍 ${fact.votesInteresting}</button>
                <button>🤯 ${fact.votesMindblowing}</button>
                <button>⛔️ ${fact.votesFalse}</button>
              </div>
            </li>
  `)

  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

function createCategoryList(categoryArray) {
  const htmlArr = categoryArray.map((category) => `
   <li class="category"><button
   class="btn btn-category"
   style="background-color: ${CATEGORIES.find((cat) => cat.name === category).background};
                 color: ${CATEGORIES.find((cat) => cat.name === category).color}">${category}</button></li>
  `)

  const html = htmlArr.join("");
  catList.insertAdjacentHTML("afterbegin", html);
  const allCategory = ` <li class="category"><button class="btn btn-all-categories">All</button>
            </li>`
  catList.insertAdjacentHTML("afterbegin", allCategory)
}


// Toggle form visibility 
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden"))
  {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  }
  else
  {
    form.classList.add("hidden");
    btn.textContent = "Share a fact"
    }
})