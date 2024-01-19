import Form from "@/components/Form";
import NavigationButton from "@/components/NavigationButton";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function CreatePage() {
  const router = useRouter();
  const { mutate } = useSWR("/api/trips");

  async function addTrip(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const tripData = Object.fromEntries(formData);

    const response = await fetch(`/api/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    });

    if (response.ok) {
      mutate();
      router.push("/");
    }
  }

  return (
    <>
      <h1>TripTrove</h1>

      <Form onSubmit={addTrip} />
      <NavigationButton href="/" letter="←" />
    </>
  );
}
