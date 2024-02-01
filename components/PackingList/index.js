import { useRouter } from "next/router.js";
import useSWR from "swr";

export default function PackingList() {
  const router = useRouter();
  const { id } = router.query;
  const { data: trip } = useSWR(`/api/trips/${id}`);

  return (
    <div>
      <strong>Packing list:</strong>
      <ul>
        {trip?.packingList?.map((item, index) => (
          <li key={index}>
            {item.itemQuantity !== null &&
            item.itemQuantity !== undefined &&
            item.itemQuantity !== 0
              ? `${item.itemQuantity}x `
              : ""}
            {item.itemName}
          </li>
        ))}
      </ul>
    </div>
  );
}
