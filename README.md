# Expo native-app

Husk å kjøre `npm i` i nativeClient-mappa første gang du kjører prosjektet

---

### Hvordan kjøre app

```
cd nativeClient
```

```
npx expo start
```

### Hvordan kjøre backend
```
docker compose up
```
Dette setter opp en lokal mongoDB med dummy-data, og starter backend.
Backend kjører så på http://localhost:4000/graphql.  


# Dokumentasjon

## Komponenter

Vi brukte biblioteket react native elements for å hente ferdige komponenter i tillegg til view, scrollview, textinput og andre vanlige native komponenter.

### Pagination

Vi valgte å lage en egen komponent for pagination. Dette var på grunn av at vi ikke fannt en allerede eksisterende komponent i react-native-elements som vi syntes passet til dette prosjektet. Koden tar for seg noen edge cases, dersom det ikke er flere enn 4 sider.
Dette resulterte i en del if-setninger. Vi har testet koden grundig uten å finne noen feil og vi mener derfor at kvaliteten er på nivå med en komponent vi kunne hentet fra react-native-elements.

### Theme

Vi har brukt Theme provider fra react native elements, dette gjør at appen følger temaet (light/darkmode) fra instillingene til brukerens telefon.

## Navigasjon

For å navigere rund i appen, har vi to typer navigasjon, Stack navigation og Bottom tab navigation.  
For å navigere rundt i appen, må man spesifisere routes som sier hvilken 'screen' man skal navigere til og gir dem et navn. I andre deler av appen kan man bruke en innebygd context som heter useNavigation, som lar deg navigere til ulike screens basert på navnet de har fått i routes.

### Stack Navigation

Stack navigation fungerer ved at en 'skjerm' blir lagt oppå en annen, som en stack. Dette benytter vi oss av kun for registrering av ny bruker, der vi navigerer til en fullscreen modal.

### Bottomtab Navigation

Bottomtab navigation er en tab på bunnen av skjemen som hjelper deg med å navigere mellom ulike deler av root-skjermen. Root er en komponent som samler opp komponenter som kan aksesseres gjennom bottomtab navigation. I vårt tilfelle er dette sanglisten og profilsiden.

## Innlogging

I dette prosjektet ønsket vi å utvide appen litt, og la til funksjonalitet for brukere. Dette var slik at vi hadde mer innhold til appen, og vi fikk prøvd ut flere komponenter i react native/expo.

### Endringer i backend

For å støtte innlogging la vi til litt ny funksjonalitet i backend. Vi la til et nytt felt for getSongs-endepunktet, slik at den viser null om en bruker ikke er innlogget, eller true/false om en sang er lagt til i brukerens liste eller ikke. Vi har endepunkt for login og registrer. Disse returener kun en id og brukernan om operasjoen var vellykket. Passordene hashes med bcrypt og hashen lagres i databasen. Når en bruker logger inn sammenlikner vi passrdet med den lagrede hashen. Vi har også et endepunkt med navnet "userSongListToggle", som tar inn en brukerID og en sangID. Denne legger en sang til i brukeren sin liste. Om sangen allerde er i listen vil den bli fjernet. For å lage "min side" har vi et siste endepunkt som returnerer sanger lagret av en spesifikk bruker.

## Ting vi har tatt med fra prosjekt 3

### Apollo client

For å fetche data med graphql valgte vi å bruke Apollo client, da den gir oss innebygget chaching og et bibliotek for state management. For å hente data bruker vi useQuery- og useMutation hooks, da de sammarbeider godt med cachen.

### Globale state management

For å oppdatere queries i andre komponenter har vi tatt i bruk reaktive variabler, slik at alle komponenter har mulighet til å endre på queries. Om en reaktiv variabel brukes som input for et query, oppfatter den endringen med en gang, og enten fetcher på nytt, eller henter fra cachene om den samme dataen har blitt hentet tidligere. Denne bruken av apollo gjør at siden oppfattes raskere, og at for eksempel rating-systemet kan oppdateres i frontend før appen har fått respons fra server.
