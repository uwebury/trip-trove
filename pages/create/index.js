import Form from "@/components/Form";
import useSWR from "swr";
import toast, { Toaster } from "react-hot-toast";
import BackButton from "@/components/Button/BackButton";
import { validateTripDates } from "@/lib/utils";

export default function CreateTripPage() {
  const { mutate } = useSWR("/api/trips");

  async function handleCreateSave(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const tripData = Object.fromEntries(formData);

    if (!validateTripDates(tripData)) {
      return;
    }

    const response = await fetch(`/api/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    });

    if (response.ok) {
      mutate();
      toast.success("Trip saved successfully");
      event.target.reset();
    }
  }

  return (
    <>
      <Toaster />
      <Form handleSubmit={handleCreateSave} isEditMode={false} />
      <BackButton href="/" />
    </>
  );
}
