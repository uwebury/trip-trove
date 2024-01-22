import { useRouter } from "next/router.js";
import useSWR from "swr";

export default function PackingList() {
  const router = useRouter();
  const { id } = router.query;
  const { data: trip } = useSWR(`/api/trips/${id}`);

  return (
    <p>
      <strong>Packing list:</strong> {trip.packingList}
    </p>
  );
}
