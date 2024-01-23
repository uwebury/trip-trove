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

  async function handleEdit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const tripData = Object.fromEntries(formData);

    toast(
      (t) => (
        <div>
          <p>Are you sure to save changes?</p>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleSave(tripData);
            }}
          >
            Save
          </button>
          <button onClick={() => toast.dismiss(t.id)}>Cancel</button>
        </div>
      ),
      {
        duration: Infinity,
      }
    );
  }

  if (error) return <h2>Error, please try again later...</h2>;
  if (!isReady || isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <Toaster />
      <Form onSubmit={handleEdit} defaultData={trip} isEditMode={true} />
      <BackButton href={`/trips/${id}`} />
    </>
  );
}
