import { initialTrips } from "@/lib/data";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <h1>TripTrove</h1>
      <ul>
        {initialTrips.map((trip) => (
          <li key={trip.slug}>
            {trip.destination}
            <ul>
              <li>{trip.start}</li>
              <li>{trip.end}</li>
              <Image
                src={trip.image}
                width={300}
                height={200}
                alt={trip.destination}
              />
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
