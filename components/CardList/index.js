import useSWR from "swr";
import Image from "next/image";
import styled from "styled-components";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

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

export default function CardList() {
  const { data, error, isLoading } = useSWR("/api/trips", {
    fallbackData: [],
  });
  if (error) return <div>Failed to load</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <StyledCardList>
      {data.map((trip) => (
        <Link
          href={`trips/${trip._id}`}
          key={trip._id}
          style={{ textDecoration: "none" }}
        >
          <StyledCard>
            <h2>{trip.destination}</h2>
            <strong>Start:</strong> {formatDate(trip.start)} |{" "}
            <strong>End:</strong> {formatDate(trip.end)}
            <p>
              <Image
                src={
                  trip.imageURL !== "" ? trip.imageURL : "/images/default.png"
                }
                width={300}
                height={200}
                alt={trip.destination}
              />
            </p>
            <p>More Details</p>
          </StyledCard>
        </Link>
      ))}
    </StyledCardList>
  );
}
