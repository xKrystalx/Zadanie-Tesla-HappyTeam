# Zadanie rekrutacyjne Happy Team - Tesla Rent App

## [Frontend] Key considerations

> Available locations

- Loading location data from backend, finding related entries on the frontend side to display them.
- From a UX standpoint using a map representation of Mallorca with markers seems like a good idea.

> Selecting pickup and return dates

- Making sure user cannot pick conflicting dates (ex. in the past, return earlier than pickup etc.).

> Available cars

- Visually and functionally display which cars are available to be selected within the specified date range.

> Client details

- Basic validations client-side to prevent empty and partially incorrect data.
- Include proper error messages for wrong entries.

> Reservation summary

- In my eyes it is important to show the potential client the reservation details that they are about to confirm and send to the backend.
- Display the reservation button in different states depending on the request status. Disable the button while sending and on success, but re-enable on error.

> General

- Reservation part of the frontend has an exit button if a user would like to select a different location or restart the process without refreshing the page entirely.

## [Backend] Key considerations

> API routes and methods

- Serve only GET requests for cars and locations, POST only for reservations

> Validation

- Basic validation through properties applied in model files.
- Double check things like total cost and available cars within specified date range, to prevent hacky users fiddling with custom requests _(including making sure we're referencing correct locations and car models)_. There's of course more things to validate like the date ranges themselves, but are not included.

> Cars

- Mallorca is a rather small island and distances between Tesla locations are roughly ~50km, cars can be delivered to any location by employees for pickup and to the user they have all the cars available to them. On the backend every car type has a total number of available units, rather than different ones tied to locations.

- If a user places a reservation, the total availability of that car model decreases for the reservation specific date range. Frontend then takes care of displaying that to the user.
