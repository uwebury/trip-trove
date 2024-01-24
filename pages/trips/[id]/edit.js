import useSWR from "swr";
import { useRouter } from "next/router";
import styled from "styled-components";
import Form from "@/components/Form";
import BackButton from "@/components/Button/BackButton";
import { toast, Toaster } from "react-hot-toast";
import {
  SaveChangesMessage,
  CancelEditMessage,
} from "@/components/ToastMessage";

const StyledMessage = styled.h2`
  margin: 2rem auto;
`;

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: trip, isLoading, error, mutate } = useSWR(`/api/trips/${id}`);

  const handleSave = async (tripData) => {
    const response = await fetch(`/api/trips/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    });

    if (response.ok) {
      mutate();
      toast.success("Changes saved successfully.");
    }
  };

  const handleCancelToast = (originalData) => {};

  async function handleEdit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const tripData = Object.fromEntries(formData);

    toast(
      <SaveChangesMessage
        onConfirm={() => handleSave(tripData)}
        onCancel={() => {}}
      />,
      {
        duration: Infinity,
      }
    );
  }

  if (error)
    return <StyledMessage>Error, please try again later...</StyledMessage>;
  if (!isReady || isLoading) return <StyledMessage>Loading...</StyledMessage>;

  return (
    <>
      <Toaster />
      <Form
        onSubmit={handleEdit}
        onCancel={handleCancelToast}
        defaultData={trip}
        isEditMode={true}
      />
      <BackButton href={`/trips/${id}`} />
    </>
  );
}
