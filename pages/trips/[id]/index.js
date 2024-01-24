import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import PackingList from "@/components/PackingList";
import BackButton from "@/components/Button/BackButton";
import styled from "styled-components";

const StyledFormButton = styled.button`
  min-width: 140px;
  padding: 0.5rem;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border: 2px solid #848484;
  border-radius: 0.5rem;
  font-size: inherit;
  font-weight: bold;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledMessage = styled.h2`
  margin: 2rem auto;
`;

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: trip, isLoading, error } = useSWR(`/api/trips/${id}`);

  const handleEditClick = () => {
    router.push(`${id}/edit`);
  };

  if (error)
    return <StyledMessage>Error, please try again later...</StyledMessage>;
  if (!isReady || isLoading) return <StyledMessage>Loading...</StyledMessage>;

  return (
    <>
      <h2>{trip.destination}</h2>
      <strong>Start:</strong> {formatDate(trip.start)} | <strong>End:</strong>{" "}
      {formatDate(trip.end)}
      <p>
        <Image
          src={trip.imageURL !== "" ? trip.imageURL : "/images/default.png"}
          width={300}
          height={200}
          alt={trip.destination}
        />
      </p>
      <ButtonContainer>
        <StyledFormButton onClick={handleEditClick} $backgroundColor="#ffdbdb">
          Edit
        </StyledFormButton>
      </ButtonContainer>
      <p>
        <strong>Notes:</strong> {trip.notes}
      </p>
      <PackingList />
      <BackButton href="/" />
    </>
  );
}
