import { useRouter } from "next/router.js";
import useSWR from "swr";

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: trip, isLoading, error } = useSWR(`/api/trips/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2>{trip.destination}</h2>
    </>
  );
}
