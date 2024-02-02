import { useRouter } from "next/router.js";
import useSWR from "swr";

export default function PackingList() {
  const router = useRouter();
  const { id } = router.query;
  const { data: trip } = useSWR(`/api/trips/${id}`);

  const filteredPackingList = trip?.packingList?.filter(
    (item) => item.itemName && item.itemName.trim() !== ""
  );

  return (
    <div>
      <strong>Packing list:</strong>
      <ul>
        {filteredPackingList?.map((item) => (
          <li key={item._id}>
            {item.itemQuantity ? `${item.itemQuantity}x ` : ""}
            {item.itemName}
          </li>
        ))}
      </ul>
    </div>
  );
}
