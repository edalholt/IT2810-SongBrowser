# Backend
Husk å kjøre `npm i`  i backend-mappa første gang du kjører prosjektet
___

### Hvordan kjøre server:
```
npm run dev
```
Om du ikke trenger at serveren reloader ved hver endring kan man heller kjøre:
```
npm run deploy
```
Backend kjører så på http://localhost:4000/graphql

<hr>  

### Eksempel-spørring:
Returnerer to sanger med tilhørende felt, og antall sider hvor man kan bla gjennom resten av data som matcher år 1970. Endre page for å bla gjennom data.
Om man ikke spesifiserer er page 1 som standard, og pageSize 10.


```typeScript
{
  getSongs(year: 1970, pageSize: 2, page: 2) {
    songs {
      name
      artists
      year
      energy
      duration_ms
      danceability
      explicit
      tempo
      popularity
      acousticness
      key
    }
    page
    totalPages
  }
}

```
Søk og filtrering kan gjøres cirka slik:
```
getSongs(orderBy: {duration_ms: desc}, pageSize: 5, search: "Fire"){
  ...
}
```
## Egen rangering av sanger
Tjenesten støtter egen rangering av sanger. Om den ikke er er rangert returnerer endepunket "null", da det ikke finnes en rangering på den spesifikke sangen.  
En sang kan rangeres slik:  
```
mutation {
  rateSong(_id: "634b4f1fdad5dd1cb9c85ad1", rating: 4){
    name
    rating
    _id
  }
}
```
Dette gir output:
```
{
  "data": {
    "rateSong": {
      "name": "Blinding Lights",
      "rating": 4,
      "_id": "634b4f1fdad5dd1cb9c85ad1"
    }
  }
}
```