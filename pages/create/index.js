import Form from "@/components/Form";
import NavigationButton from "@/components/NavigationButton";

export default function CreatePage(href, letter, position) {
  return (
    <>
      <h1>TripTrove</h1>

      <Form />
      <NavigationButton href="/" letter="←" />
    </>
  );
}
