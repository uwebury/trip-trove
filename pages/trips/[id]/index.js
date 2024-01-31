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
        <StyledTextButton onClick={handleDelete} disabled={buttonsDisabled}>
          Delete
        </StyledTextButton>
        <StyledTextButton onClick={handleEdit} disabled={buttonsDisabled}>
          Edit
        </StyledTextButton>
      </ButtonContainer>
      <p>
        <strong>Notes:</strong> {trip.notes}
      </p>
      <PackingList />
      <BackButton href="/" />
    </>
  );
}
