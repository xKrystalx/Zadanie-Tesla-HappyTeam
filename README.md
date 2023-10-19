# Zadanie rekrutacyjne Happy Team - Tesla Rent App

![Main screen](https://github.com/xKrystalx/Zadanie-Tesla-HappyTeam/assets/22894343/773632a1-9441-48cf-b779-6808016e1e59)

## [Frontend] Key considerations

> Available locations

- Loading location data from backend, finding related entries on the frontend side to display them. By storing position of markers on the frontend, there's more flexibility in how to present the available locations.
- From a UX standpoint using a map representation of Mallorca with markers seems like a good idea.

![Locations](https://github.com/xKrystalx/Zadanie-Tesla-HappyTeam/assets/22894343/db4a2a12-f125-4fe9-a64d-f50ea8c88a78)

> Selecting pickup and return dates

- Making sure user cannot pick conflicting dates (ex. in the past, return earlier than pickup etc.).

![Selecting dates](https://github.com/xKrystalx/Zadanie-Tesla-HappyTeam/assets/22894343/cdb6df03-c434-40a5-83bb-a1755e1bda9c)

> Available cars

- Visually and functionally display which cars are available to be selected within the specified date range.

![Available cars](https://github.com/xKrystalx/Zadanie-Tesla-HappyTeam/assets/22894343/e3f31368-b576-44d8-97cb-ed89a2babffc)

> Client details

- Basic validations client-side to prevent empty and partially incorrect data.
- Include proper error messages for wrong entries.

![Client details](https://github.com/xKrystalx/Zadanie-Tesla-HappyTeam/assets/22894343/35156b49-4cf3-443e-b0eb-2ad1001fd446)

> Reservation summary

- In my eyes it is important to show the potential client the reservation details that they are about to confirm and send to the backend.
- Display the reservation button in different states depending on the request status. Disable the button while sending and on success, but re-enable on error.

![Summary](https://github.com/xKrystalx/Zadanie-Tesla-HappyTeam/assets/22894343/c62bf55a-e0f3-435c-a483-5fa96527e56d)
![Sending request](https://github.com/xKrystalx/Zadanie-Tesla-HappyTeam/assets/22894343/f61a598e-35cb-499c-a91d-dbbc62744d44)

> Miscellaneous

- Reservation part of the frontend has an exit button if a user would like to select a different location or restart the process without refreshing the page entirely.

## [Backend] Key considerations

> Database

- I went with an in-memory database for simplicity and an easy way to have a clean start.

> Data seeding

- For convenience and automation during development, backend is initializing the in-memory database with location and car data from JSON files on each reboot.

> API routes and methods

- Serve only GET requests for cars and locations, POST only for reservations

> Validation

- Basic validation through properties applied in model files.
- Double check things like total cost and available cars within specified date range, to prevent hacky users fiddling with custom requests _(including making sure we're referencing correct locations and car models)_. There's of course more things to validate like the date ranges themselves, but are not included.

> Cars

- Mallorca is a rather small island and distances between Tesla locations are roughly ~50km, cars can be delivered to any location by employees for pickup and to the user they have all the cars available to them. On the backend every car type has a total number of available units, rather than different ones tied to locations.

- If a user places a reservation, the total availability of that car model decreases for the reservation specific date range. Frontend then takes care of displaying that to the user.
