import styled from "styled-components";
import Image from "next/image";
import useSWR from "swr";

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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export default function CardList() {
  const { data, error } = useSWR("/api/trips", { fallbackData: [] });
  if (error) return <div>Failed to load</div>;

  if (!data) return <div>Loading...</div>;

  return (
    <StyledCardList>
      {data.map((trip) => (
        <StyledCard key={trip._id}>
          <h2>{trip.destination}</h2>
          <div>
            <p>
              <strong>Start:</strong> {formatDate(trip.start)}
            </p>
            <p>
              <strong>End:</strong> {formatDate(trip.end)}
            </p>
          </div>
          <Image
            src={trip.imageURL}
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
