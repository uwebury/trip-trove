import useSWR from "swr";
import { useRouter } from "next/router";
import styled from "styled-components";
import Form from "@/components/Form";
import BackButton from "@/components/Button/BackButton";
import { toast, Toaster } from "react-hot-toast";
import { SaveChangesMessage } from "@/components/ToastMessage";
import { useState } from "react";
import { validateTripDates } from "@/lib/utils";

const StyledMessage = styled.h2`
  margin: 2rem auto;
`;

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: trip, isLoading, error, mutate } = useSWR(`/api/trips/${id}`);

  const [isToastActive, setIsToastActive] = useState(false);

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

  async function handleEditSave(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const tripData = Object.fromEntries(formData);

    if (!validateTripDates(tripData)) {
      return;
    }

    setIsToastActive(true);

    toast(
      <SaveChangesMessage
        onConfirm={() => {
          handleSave(tripData);
          setIsToastActive(false);
        }}
        onCancel={() => {
          setIsToastActive(false);
        }}
      />,
      {
        duration: Infinity,
      }
    );
  }

  const toggleToastActive = (isActive) => {
    setIsToastActive(isActive);
  };

  if (error)
    return <StyledMessage>Error, please try again later...</StyledMessage>;
  if (!isReady || isLoading) return <StyledMessage>Loading...</StyledMessage>;

  return (
    <>
      <Toaster />
      <Form
        onSubmit={handleEditSave}
        defaultData={trip}
        isEditMode={true}
        isDisabled={isToastActive}
        onToastToggle={toggleToastActive}
      />
      <BackButton href={`/trips/${id}`} />
    </>
  );
}
