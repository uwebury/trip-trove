import Form from "@/components/Form";
import NavigationButton from "@/components/NavigationButton";
import useSWR from "swr";

export default function CreateTripPage() {
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
    }
  }

  return (
    <>
      <h1>TripTrove</h1>

      <Form onSubmit={addTrip} formName={"add-trip"} />
      <NavigationButton href="/" letter="←" />
    </>
  );
}
