import useSWR from "swr";
import Image from "next/image";
import styled from "styled-components";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

const StyledCardList = styled.ul`
  margin: 2rem auto;
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

const StyledLink = styled(Link)`
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  &:link,
  &:visited {
    color: inherit;
  }
`;

export default function CardList() {
  const { data, error, isLoading } = useSWR("/api/trips", {
    fallbackData: [],
  });
  if (error) return <div>Failed to load</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <StyledCardList>
      {[...data].reverse().map((trip) => (
        <StyledLink href={`trips/${trip._id}`} key={trip._id}>
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
        </StyledLink>
      ))}
    </StyledCardList>
  );
}
