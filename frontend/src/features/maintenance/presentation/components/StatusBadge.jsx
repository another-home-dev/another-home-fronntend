import Badge from "@shared/components/Badge";

const STATUS_TONE = {
  Pending: "warning",
  "In Progress": "info",
  Resolved: "success",
};

export default function StatusBadge({ status }) {
  return <Badge tone={STATUS_TONE[status] ?? "neutral"}>{status}</Badge>;
}
