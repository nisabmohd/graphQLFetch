# This repo focuses on getting data from GraphQL API with Javascript Browser FetchAPI


#### Example :

```js
    const query=
    `
    query Query {
        continent(code: "AF") {
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
    fetch(`https://countries.trevorblades.com`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query
    })

```
