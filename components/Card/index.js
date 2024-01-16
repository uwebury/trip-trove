import styled from "styled-components";
import Image from "next/image";
import { initialTrips } from "@/lib/data";

export default function Card() {
  const StyledCard = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    h2 {
      margin-top: 0;
    }

    .dates {
      font-size: 0.9em;
      color: #666;
    }

    .image-container {
      margin-top: 8px;
    }
  `;

  return (
    <>
      {initialTrips.map((trip) => (
        <StyledCard key={trip.destination}>
          <h2>{trip.destination}</h2>
          <div className="dates">
            <p>
              <strong>Start:</strong> {trip.start}
            </p>
            <p>
              <strong>End:</strong> {trip.end}
            </p>
          </div>
          {/* <div className="image-container"> */}
          <Image
            src={trip.image}
            width={300}
            height={200}
            alt={trip.destination}
          />
          {/* </div> */}
        </StyledCard>
      ))}
    </>
  );
}
