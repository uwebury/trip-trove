import { useEffect, useState } from "react";
import { initialTrips } from "@/lib/data";
import CardList from "@/components/CardList";
import NavigationButton from "@/components/NavigationButton";

export default function HomePage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("tripsData");

    if (!storedData) {
      localStorage.setItem("tripsData", JSON.stringify(initialTrips));
    }

    const parsedData = storedData ? JSON.parse(storedData) : [];
    setTrips(parsedData);
  }, []);

  return (
    <>
      <h1>TripTrove</h1>
      <CardList trips={trips} />
      <NavigationButton href="/create" letter="+" position="right" />
    </>
  );
}
