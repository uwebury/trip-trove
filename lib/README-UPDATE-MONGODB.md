## Info

@Uwe/Felix: Vielleicht hattet ihr darüber bereits gesprochen. Nach Implementierung des Backends müssten wir noch die Funktionalität wiederherstellen, dass auf der Homepage nach Modus "last entry first displayed" angezeigt wird.

(Reminder: /lib/data.js kann gelöscht werden.)

## Steps

Um dies zu gewährleisten, sind vermutlich folgende Steps erforderlich:

1. MongoDB: Überschreiben der aktuellen Daten mit dem überarbeiteten JSON String unten (die Musterdatensätze haben jetzt einen timestamp erhalten, damit ein Sortieren möglich ist).
2. CardList component: Überarbeiten (eine zusätzliche Zeile Code und eine Anpassung der Variable im .map)

## zu 2. Codeanpassung CardList

```JS
export default function CardList() {
  const { data, error, isLoading } = useSWR("/api/trips", { fallbackData: [] });
  if (error) return <div>Failed to load</div>;

  if (isLoading) return <div>Loading...</div>;

  const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);

  return (
    <StyledCardList>
      {sortedData.map((trip) => (
```

## zu 1. Neue Mongo DB Daten

```JSON
[
{
"_id": "65a90e9ee2dd7d92791104b9",
"destination": "New York",
"start": "2024-04-01T00:00:00.000Z",
"end": "2024-04-10T00:00:00.000Z",
"imageURL": "https://dummyimage.com/600x400/D00000/fff.png&text=NewYork",
"notes": "",
"createdAt": "2024-01-11T12:00:00.000Z",
"updatedAt": "2024-01-11T12:00:00.000Z",
},
{
"_id": "65a90e9ee2dd7d92791104ba",
"destination": "Mallorca",
"start": "2024-06-01T00:00:00.000Z",
"end": "2024-06-08T00:00:00.000Z",
"imageURL": "https://dummyimage.com/600x400/FFBA08/fff.png&text=Mallorca",
"notes": "",
"createdAt": "2024-01-12T12:00:00.000Z",
"updatedAt": "2024-01-12T12:00:00.000Z",
},
{
"_id": "65a90e9ee2dd7d92791104bb",
"destination": "Thailand",
"start": "2024-12-01T00:00:00.000Z",
"end": "2024-12-24T00:00:00.000Z",
"imageURL": "https://dummyimage.com/600x400/3F88C5/fff.png&text=Thailand",
"notes": "5 days Bangkok, 5 days Ko Samui, 6 days Ko Tao, 6 days Ko Pangang",
"createdAt": "2024-01-13T12:00:00.000Z",
"updatedAt": "2024-01-13T12:00:00.000Z",
},
{
"_id": "65a90e9ee2dd7d92791104bc",
"destination": "London",
"start": "2024-08-31T00:00:00.000Z",
"end": "2024-09-03T00:00:00.000Z",
"imageURL": "https://dummyimage.com/600x400/032B43/fff.png&text=London",
"notes": "",
"createdAt": "2024-01-14T12:00:00.000Z",
"updatedAt": "2024-01-14T12:00:00.000Z",
},
{
"_id": "65a90e9ee2dd7d92791104bd",
"destination": "Paris",
"start": "2024-01-17T00:00:00.000Z",
"end": "2024-01-24T00:00:00.000Z",
"imageURL": "https://dummyimage.com/600x400/136F63/fff.png&text=Paris",
"notes": "Business trip, visit Tour Eiffel",
"createdAt": "2024-01-15T12:00:00.000Z",
"updatedAt": "2024-01-15T12:00:00.000Z",
},
{
"_id": "65aa4ad19c4eaffcc737a953",
"destination": "Zürich",
"start": "2024-01-30T00:00:00.000Z",
"end": "2024-02-10T00:00:00.000Z",
"imageURL": "https://dummyimage.com/600x400/FFBA08/fff.png&text=Zürich",
"notes": "",
"createdAt": "2024-01-19T10:11:29.608Z",
"updatedAt": "2024-01-19T10:11:29.608Z",
"__v": 0
},
{
"_id": "65aa5883b788a9c9c1e87180",
"destination": "Seoul",
"start": "2024-01-19T00:00:00.000Z",
"end": "2024-01-16T00:00:00.000Z",
"imageURL": "https://dummyimage.com/600x400/FFBA08/fff.png&text=Seoul",
"notes": "",
"createdAt": "2024-01-19T11:09:55.683Z",
"updatedAt": "2024-01-19T11:09:55.683Z",
"__v": 0
},
{
"_id": "65aa6e33d5b30c388f06d4f5",
"destination": "Rome",
"start": "2024-01-19T00:00:00.000Z",
"end": "2024-01-18T00:00:00.000Z",
"imageURL": "",
"notes": "",
"createdAt": "2024-01-19T12:42:27.956Z",
"updatedAt": "2024-01-19T12:42:27.956Z",
"__v": 0
},
{
"_id": "65aa6fdfd5b30c388f06d50d",
"destination": "Vienna",
"start": "2024-01-19T00:00:00.000Z",
"end": "2024-01-21T00:00:00.000Z",
"imageURL": "https://dummyimage.com/600x400/4b9fa5/95bf6f?text=Vienna",
"notes": "",
"createdAt": "2024-01-19T12:49:35.842Z",
"updatedAt": "2024-01-19T12:49:35.842Z",
"__v": 0
},
{
"_id": "65aa8adfe0910534ceca2c8b",
"destination": "Zürich2024",
"start": "2024-01-24T00:00:00.000Z",
"end": "2024-01-26T00:00:00.000Z",
"imageURL": "",
"notes": "",
"createdAt": "2024-01-19T14:44:47.455Z",
"updatedAt": "2024-01-19T14:44:47.455Z",
"__v": 0
},
{
"_id": "65aa8af0e0910534ceca2c8f",
"destination": "Zürich999999999999",
"start": "2024-01-19T00:00:00.000Z",
"end": "2024-01-22T00:00:00.000Z",
"imageURL": "https://dummyimage.com/600x400/605b7/f899fb?text=Z%C3%BCrich999999999999",
"notes": "",
"createdAt": "2024-01-19T14:45:04.366Z",
"updatedAt": "2024-01-19T14:45:04.366Z",
"__v": 0
},
{
"_id": "65aa8fa8443925fb388e1fc9",
"destination": "test",
"start": "2024-01-19T00:00:00.000Z",
"end": "2024-01-21T00:00:00.000Z",
"imageURL": "",
"notes": "tset",
"createdAt": "2024-01-19T15:05:12.417Z",
"updatedAt": "2024-01-19T15:05:12.417Z",
"__v": 0
}
]
```
