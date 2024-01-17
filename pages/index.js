import CardList from "@/components/CardList";
import NavigationButton from "@/components/NavigationButton";

export default function HomePage() {
  return (
    <>
      <h1>TripTrove</h1>
      <CardList />
      <NavigationButton href="/create" letter="+" position="right" />
    </>
  );
}
