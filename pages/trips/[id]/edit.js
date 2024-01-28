import useSWR from "swr";
import { useRouter } from "next/router";
import Form from "@/components/Form";
import BackButton from "@/components/Button/BackButton";
import { toast, Toaster } from "react-hot-toast";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: trip, isLoading, error, mutate } = useSWR(`/api/trips/${id}`);

  const handleSubmit = async (tripData) => {
    const response = await fetch(`/api/trips/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    });

    if (response.ok) {
      mutate();
    }

    if (!response.ok) {
      toast.error(
        "Oops! Something went wrong while processing your request. Please check your input and try again."
      );
    }
  };

  return (
    <>
      <Toaster />
      <Form onSubmit={handleSubmit} defaultData={trip} isEditMode={true} />
      <BackButton href={`/trips/${id}`} />
    </>
  );
}
