const params = new URLSearchParams(window.location.search);

const insert=document.querySelector('#in')

const code=params.get('cn')

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
        country(code: "${code}") {
          name
          native
          code
          phone
          capital
          currency
          languages{
            name
          }
        }
      }
    `
).then(data => {
    temp=''
    JSON.stringify(data.data.country).split(',').forEach(item=>{
        temp+=`<pre>${item}</pre>`
    })
    insert.innerHTML=temp
    
})