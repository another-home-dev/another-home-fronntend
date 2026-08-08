import Badge from "@shared/components/Badge";

const PRIORITY_TONE = {
  High: "danger",
  Medium: "warning",
  Low: "success",
};

export default function PriorityBadge({ priority }) {
  return <Badge tone={PRIORITY_TONE[priority] ?? "neutral"}>{priority}</Badge>;
}
