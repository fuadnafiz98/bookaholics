import { useRouter } from "next/router";

export default function EachGenre() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h2>{id}</h2>
    </div>
  );
}
