import useSWR from "swr";
import Image from "next/image";
import styled from "styled-components";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";

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

const StyledSelect = styled.select`
  padding: 8px 16px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export default function CardList() {
  const { data, error, isLoading } = useSWR("/api/trips", {
    fallbackData: [],
  });
  const [sortMethod, setSortMethod] = useState("default");
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (data) {
      setSortedData(sortTrips(data, sortMethod));
    }
  }, [sortMethod, data]);

  const sortTrips = (trips, method) => {
    switch (method) {
      case "dateAsc":
        return [...trips].sort((a, b) => new Date(a.start) - new Date(b.start));
      case "dateDesc":
        return [...trips].sort((a, b) => new Date(b.start) - new Date(a.start));
      case "durationAsc":
        return [...trips].sort(
          (a, b) =>
            new Date(a.end) -
            new Date(a.start) -
            (new Date(b.end) - new Date(b.start))
        );
      case "durationDesc":
        return [...trips].sort(
          (a, b) =>
            new Date(b.end) -
            new Date(b.start) -
            (new Date(a.end) - new Date(a.start))
        );
      case "alphaAsc":
        return [...trips].sort((a, b) =>
          a.destination.localeCompare(b.destination)
        );
      case "alphaDesc":
        return [...trips].sort((a, b) =>
          b.destination.localeCompare(a.destination)
        );
      default:
        return [...trips].reverse();
    }
  };

  if (error) return <div>Failed to load</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <StyledCardList>
      <StyledSelect onChange={(event) => setSortMethod(event.target.value)}>
        <option value="default">Most Recent Entry First</option>
        <option value="dateAsc">Start Date: Sooner First</option>
        <option value="dateDesc">Start Date: Later First</option>
        <option value="durationAsc">Shorter Trips First</option>
        <option value="durationDesc">Longer Trips First</option>
        <option value="alphaAsc">Alphabetical (A-Z)</option>
        <option value="alphaDesc">Alphabetical (Z-A)</option>
      </StyledSelect>
      {sortedData.map((trip) => (
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
