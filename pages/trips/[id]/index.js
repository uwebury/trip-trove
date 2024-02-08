import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import Image from "next/image";
import { toastDuration, formatDate } from "@/lib/utils";
import PackingList from "@/components/PackingList";
import {
  ButtonContainer,
  StyledTextButton,
} from "@/components/Button/TextButton";
import BackButton from "@/components/Button/BackButton";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import { ToastMessage } from "@/components/ToastMessage";

const StyledMessage = styled.h2`
  margin: 2rem auto;
`;

const StyledCard = styled.div`
  margin-top: 0.8rem;
  display: flex;
  flex-flow: column wrap;
  gap: 0.5rem;
  background-color: var(--color-card);
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  width: 300px;
  padding: 0.2rem 1.2rem;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;

  @media (min-width: 600px) {
    width: 500px;
    margin-top: 2.6rem;
    padding: 1rem 2rem;
`;

const CardDestination = styled.h2`
  margin: 0.8rem;
  padding-top: 0.4rem;
  text-align: center;
  align-self: center;
  color: var(--color-card-title);
  font-size: 1.6rem;
  
  @media (min-width: 600px) {
    font-size: 1.8rem;

`;

const CardDateContainer = styled.div`
  margin: 0;
  padding: 0;
  margin-bottom: 0.2rem;
  border-color: transparent;
  display: grid;
  align-self: center;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: auto auto;
  grid-auto-flow: row;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
`;

const CardDateLabel = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
  color: var(--color-card-date-label);
`;

const CardDate = styled.p`
  margin: 0;
  padding: 0.1rem;
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--color-card-date);
 
  @media (min-width: 600px) {
    font-size: 1.1rem;

`;

const CardImage = styled(Image)`
  margin: 0;
  padding: 0;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  align-self: center;
`;

const CardNotes = styled.p`
  margin: 0;
  padding: 0;
  color: var(--color-card-text);
  margin-bottom: 0.8rem;
`;
const CardNotesLabel = styled(CardNotes)`
  font-weight: bold;
  margin-bottom: 0;
`;

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: trip, isLoading, error } = useSWR(`/api/trips/${id}`);

  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  function handleEdit() {
    router.push(`${id}/edit`);
  }

  function handleDelete() {
    setButtonsDisabled(true);
    toast(
      <ToastMessage
        message="Are you sure to delete trip?"
        textConfirmButton="Yes, delete."
        messageAfterConfirm="Trip successfully deleted."
        textCancelButton="No, don&rsquo;t delete!"
        messageAfterCancel="Trip not deleted."
        onConfirm={() => {
          deleteTrip();
        }}
        onCancel={() => {
          setButtonsDisabled(false);
        }}
      />,
      { duration: Infinity }
    );
  }

  async function deleteTrip() {
    try {
      await fetch(`/api/trips/${id}`, {
        method: "DELETE",
      });
      await new Promise((resolve) => setTimeout(resolve, toastDuration));
      router.push("/");
    } catch (error) {
      setButtonsDisabled(false);
      toast.error("Error deleting trip!");
    }
  }

  if (error)
    return <StyledMessage>Error, please try again later...</StyledMessage>;
  if (!isReady || isLoading) return <StyledMessage>Loading...</StyledMessage>;

  return (
    <>
      <Toaster />
      <StyledCard>
        <CardDestination>{trip.destination}</CardDestination>
        <CardDateContainer>
          <CardDateLabel>Start:</CardDateLabel>
          <CardDate>{formatDate(trip.start)}</CardDate>
          <CardDateLabel>End:</CardDateLabel>
          <CardDate>{formatDate(trip.end)}</CardDate>
        </CardDateContainer>
        <CardImage
          src={
            trip.imageURL !== ""
              ? trip.imageURL
              : "/images/triptrove-default.png"
          }
          width={300}
          height={200}
          alt={trip.destination}
        />
        <ButtonContainer>
          <StyledTextButton onClick={handleDelete} disabled={buttonsDisabled}>
            Delete
          </StyledTextButton>
          <StyledTextButton onClick={handleEdit} disabled={buttonsDisabled}>
            Edit
          </StyledTextButton>
        </ButtonContainer>
        {trip.notes !== "" && (
          <>
            <CardNotesLabel>Notes:</CardNotesLabel>
            <CardNotes>{trip.notes}</CardNotes>
          </>
        )}
        {trip.packingList && trip.packingList.length !== 0 && <PackingList />}
        <BackButton href="/" />
      </StyledCard>
    </>
  );
}
