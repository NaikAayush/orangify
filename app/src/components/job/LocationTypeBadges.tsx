import { capitalize } from "../../lib/string";

export default function LocationTypeBadges({ type }: { type: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
      {capitalize(type)}
    </span>
  );
}
