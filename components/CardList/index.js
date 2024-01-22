import useSWR from "swr";
import Card from "../Card";

export default function CardList() {
  const { error, isLoading } = useSWR("/api/trips", { fallbackData: [] });
  if (error) return <div>Failed to load</div>;

  if (isLoading) return <div>Loading...</div>;

  return <Card />;
}
