# PG6301 konteeksamen Magnus Hodne - "Thischord"

[Heroku](https://pg6301-mhodne.herokuapp.com/)

[Coverage client](https://github.com/kristiania-pg6301-2022/pg6301konte-MagnusHodne/commit/89f4652afdcf3f9a7b9d4aa7eafe5e17a32d12c8#commitcomment-80997968)

<img width="625" alt="image" src="https://user-images.githubusercontent.com/60000396/184307128-16b00cd5-335f-40eb-a1cf-8c98ab74ff33.png">

[Coverage server](https://github.com/kristiania-pg6301-2022/pg6301konte-MagnusHodne/commit/89f4652afdcf3f9a7b9d4aa7eafe5e17a32d12c8#commitcomment-80997980)

<img width="626" alt="image" src="https://user-images.githubusercontent.com/60000396/184307164-25cf1418-cceb-4013-9fd0-d7b33452951b.png">

GitHub navigerer dessverre ikke direkte til kommentarene når du klikker på linkene, så har lagt ved bilder som et ekstra sikkerhetstiltak for at det blir sett

## Egenutfylling av funksjonelle krav
* [X] Anonyme brukere skal ikke kunne se chatloggen, men skal kunne logge seg inn
* [X] Brukere kan logge seg inn. Det anbefales at du implementerer at brukerne logger seg inn med Google, men andre
mekanismer er også akseptabelt
* [X] En bruker som er logget inn kan se på sin profilside (userinfo fra Google)
* [X] Innloggede brukere skal kunne sende chatmeldinger
* [X] Meldinger som sendes inn skal lagres i Mongodb
* [X] Innloggede brukere skal kunne se chatmeldinger umiddelbart. Bruk websockets for å hente oppdateringer
* [X] Chatmeldinger skal inneholde navnet på brukeren som skrev dem. Navnet skal hentes fra identity provider (Google, Active
Directory)
* [X] Når bruker logger seg inn skal websiden hente eksisterende meldinger
* [ ] Ekstrapoeng - kan kompensere for andre mangler: Implementer flere chatrom der brukeren kan velge hvilket chatrom de
skal se
* [ ] Ekstrapoeng - kan kompensere for andre mangler: Brukeren kan legge inn navn og bio på sin brukerprofil og brukere kan
se andres brukerprofil
  * [X] Bruker kan legge inn bio på sin profil. 
  * [ ] Bruker kan se andres profil
* [X] Brukere skal forbli logget inn når de refresher websiden
* [X] Alle feil fra server skal presenteres til bruker på en pen måte, med mulighet for brukeren til å prøve igjen

## Egenutfylling av tekniske krav

### Må-krav
* [X] Besvarelsen skal inneholde en README-fil med link til Heroku og test coverage
  * [X] Heroku
  * [X] Test coverage
* [X] npm start skal starte server og klient
* [X] npm test skal kjøre tester. Testene skal ikke feile
* [X] Koden skal ha konsistent formattering. Prettier og Husky anbefales
* [X] Nettsidene skal ha god layout med CSS Grid (Holy Grail layout) og horisontal navigasjonsmeny. Brukeren må kunne navigere overalt uten å bruke "back" eller redigere URL
* [X] Serveren validerer at brukeren er logget inn
* [X] Chatmeldinger skal lagres i MongoDB
* [X] Applikasjonen skal deployes til Heroku
* [X] Testene skal kjøre på Github Actions
* [X] Innlevering skal være i form av en ZIP-fil. Maks størrelse 1MB

### Bør-krav
* [X] Github Actions bør beregne testcoverage. Testdekningen bør være over 50%
  * [X] Over 50% server
  * [X] Over 50% client
* [X] Brukeren ser kun menyvalg som de har tilgang til
* [X] Brukere som går til en side de ikke har tilgang til blir bedt om å logge inn

### Annet
* [X] Oppsett av package.json, parcel, express, prettier
* [X] React Router
* [X] Express app
* [X] Kommunikasjon mellom frontend (React) og backend (Express)
* [X] Deployment til Heroku
* [X] Bruk av MongoDB
  * Brukt Mongoose for å forenkle databasehåndtering.
  * Tester av database gjøres med en in-memory database, i stedet for å risikere at tester ikke kjører pga. MongoDB er nede
  * Har med både inserts og updates
* [X] OpenID Connect
  * Implementert både med Google og Active Directory. Verifisert at det funker både på localhost og Heroku
* [X] Web Sockets
* [X] Jest med dokumentert testdekning
  * Prøvde først å få Coveralls til å fungere. Fikk til å sette opp path-to-lcov: ${{ github.workspace }}/client/coverage/lcov.info) for å unngå feilmelding om at den ikke fant filen, men Coveralls rapporterte fremdeles 0% testdekning, til tross for at loggen i Github Actions indikerte høyere coverage. Antar actionen sender over feil fil av en eller annen grunn...
  * Løste coverage med jest-coverage-report-action i stedet. Satte det først opp med en matrix for at det skulle kjøre i parallell for server og client, men innså at den bygget prosjektet to ganger for dette, så var i grunn ingen vinning i dette :sweat_smile:
  * Støtte på problem med "cannot use import statement inside of a module" i node-fetch for server. Aner at det har noe med at babel ikke kjøres på node_modules, men klarte ikke å finne en hack som fikk dette til å funke. Alternativ rute for å få testet loginController ble derfor å injecte fetchJSON utenifra, slik at testene kunne kjøre
  * Har valgt å sette opp action til å kjøre med workflow-dispatch og pull-requests, for å unngå altfor høy bruk av minutter på actions
 
