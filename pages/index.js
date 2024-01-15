import { initialTrips } from "@/lib/data";
import Image from "next/image";
import Card from "@/components/Card";

export default function HomePage() {
  return (
    <div>
      <h1>TripTrove</h1>
      <div>
        {initialTrips.map((trip) => (
          <Card key={trip.destination}>
            <h2>{trip.destination}</h2>
            <div className="dates">
              <p>
                <strong>Start:</strong> {trip.start}
              </p>
              <p>
                <strong>End:</strong> {trip.end}
              </p>
            </div>
            <div className="image-container">
              <Image
                src={trip.image}
                width={300}
                height={200}
                alt={trip.destination}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
