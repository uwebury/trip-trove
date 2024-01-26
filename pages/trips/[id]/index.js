import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import PackingList from "@/components/PackingList";
import {
  ButtonContainer,
  StyledTextButton,
} from "@/components/Button/TextButton";
import BackButton from "@/components/Button/BackButton";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import { DeleteConfirmationMessage } from "@/components/ToastMessage";

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

  const confirmDelete = () => {
    toast(
      <DeleteConfirmationMessage
        onConfirm={deleteTrip}
        onCancel={() => toast.dismiss()}
      />
    );
  };

  async function deleteTrip() {
    try {
      await fetch(`/api/trips/${id}`, {
        method: "DELETE",
      });
      toast.success("Trip successfully deleted.");
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Adjust timing as needed
      router.push("/");
    } catch (error) {
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
        <StyledTextButton onClick={confirmDelete}>Delete</StyledTextButton>
        <StyledTextButton onClick={handleEditClick}>Edit</StyledTextButton>
      </ButtonContainer>
      <p>
        <strong>Notes:</strong> {trip.notes}
      </p>
      <PackingList />
      <BackButton href="/" />
    </>
  );
}
