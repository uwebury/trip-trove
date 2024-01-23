import useSWR from "swr";
import { useRouter } from "next/router";
import Form from "@/components/Form";
import Link from "next/link";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: trip, isLoading, error, mutate } = useSWR(`/api/trips/${id}`);

  async function editTrip(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const tripData = Object.fromEntries(formData);

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
  }

  if (error) return <h2>Error, please try again later...</h2>;
  if (!isReady || isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="edit-trip">Edit Trip</h2>
      <Link href={`/trips/${id}`} passHref legacyBehavior>
        back
      </Link>
      <Form onSubmit={editTrip} defaultData={trip} />
    </>
  );
}
