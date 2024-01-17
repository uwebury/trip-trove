import styled from "styled-components";
import Image from "next/image";
import { initialTrips } from "@/lib/data";

const StyledCardList = styled.ul`
  margin: 0 3rem;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-flow: column wrap;
`;

const StyledCard = styled.li`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
`;

export default function CardList({ trips }) {
  return (
    <StyledCardList>
      {trips.map((trip) => (
        <StyledCard key={trip._id}>
          <h2>{trip.destination}</h2>
          <div>
            <p>
              <strong>Start:</strong> {trip.start}
            </p>
            <p>
              <strong>End:</strong> {trip.end}
            </p>
          </div>
          <Image
            src={trip.image}
            width={300}
            height={200}
            alt={trip.destination}
          />
          <p>More Details</p>
        </StyledCard>
      ))}
    </StyledCardList>
  );
}
