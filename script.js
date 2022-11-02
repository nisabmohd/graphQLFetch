const continent = document.querySelector('#continent-picker')
const insert = document.querySelector('#inserter')

const fetchQuery = (query, args) => {
    return fetch(`https://countries.trevorblades.com`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query
        })
    }).then(res => res.json())
}

fetchQuery(
    `
    query Query {
        continents{
         code
         name
        }
       }
    `
).then(data => {
    data.data.continents.forEach((item) => {
        const elem = document.createElement('option')
        elem.value = item.code
        elem.innerText = item.name
        continent.append(elem)
    })
})


continent.addEventListener('change', (e) => {
    fetchQuery(
        `
    query Query {
        continent(code: "${e.target.value}") {
          countries{
            name
            code
            native
            phone
            capital
            currency
            emoji
            emojiU
            languages{
              name
              code
            }
          }
        }
      }
    
    `
    ).then(data => {
        console.log(data.data.continent);
        let temp = ''
        insert.innerHTML = ''
        data.data.continent.countries.forEach(item => {
            const elem = `
        <div class="col">
          <div class="card m-2" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${item.capital}</h6>
                <span class="text-black-50 fw-bold">currency</span> : ${item.currency} <br>
              <label class="text-black-50 fw-bold mt-1" for="lang">Langauges :</label>
              <p id="lang">
              ${item.languages.map(item => {
                return item.name
            })}
                
              </p>
              <a href="specific.html?cn=${item.code}" class="card-link">More about ${item.name}</a>
            </div>
          </div>
        </div>
            `
            temp += elem
        })
        insert.innerHTML = temp
    })
})

