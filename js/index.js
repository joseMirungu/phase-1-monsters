document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    const loadMoreButton = document.getElementById("load-more");
    const form = document.getElementById("monster-form");
    let page = 1;
  
   
    const fetchMonsters = (page) => {
      fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
          monsters.forEach(monster => displayMonster(monster));
        })
        .catch(error => console.error('Error:', error));
    };
  
    const displayMonster = (monster) => {
      const monsterDiv = document.createElement("div");
      monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <p>Age: ${monster.age}</p>
        <p>Description: ${monster.description}</p>
      `;
      monsterContainer.appendChild(monsterDiv);
    };
  
   
    fetchMonsters(page);
  
   
    loadMoreButton.addEventListener("click", () => {
      page++;
      fetchMonsters(page);
    });
  
   
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const description = document.getElementById("description").value;
  
      fetch('http://localhost:3000/monsters', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ name, age, description })
      })
      .then(response => response.json())
      .then(monster => {
        displayMonster(monster);
        form.reset();
      })
      .catch(error => console.error('Error:', error));
    });
  });
  