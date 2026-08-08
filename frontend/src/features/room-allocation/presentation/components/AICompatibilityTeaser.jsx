import { Cpu, Moon, Wind, BookOpen, Volume1 } from "lucide-react";
import Badge from "@shared/components/Badge";
import Button from "@shared/components/Button";

const FACTORS = [
  { icon: Moon, label: "Sleeping habits" },
  { icon: Wind, label: "Cleanliness preference" },
  { icon: BookOpen, label: "Study patterns" },
  { icon: Volume1, label: "Noise tolerance" },
];

export default function AICompatibilityTeaser() {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-800 to-primary-950 p-6 text-white">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
              <Cpu size={18} />
            </span>
            <Badge tone="info" className="bg-white/15 text-white">
              AI · Coming soon
            </Badge>
          </div>

          <h3 className="mt-3 text-lg font-bold">Roommate Compatibility Matching</h3>
          <p className="mt-1 max-w-xl text-sm text-primary-100">
            Automatically suggest the best roommate pairings using compatibility scoring across:
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {FACTORS.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium">
                <Icon size={13} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <Button variant="secondary" disabled className="shrink-0 bg-white/10 text-white hover:bg-white/10">
          Enable AI Matching
        </Button>
      </div>
    </div>
  );
}
