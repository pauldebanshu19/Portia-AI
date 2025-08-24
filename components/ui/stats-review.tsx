import { Progress } from "@/components/ui/progress";

interface Stat {
  name: string;
  value: string; // Accepts value as a string
  max: number;
}

interface StatsReviewProps {
  numericValues: string[]; // Accepts values as strings
}

export function StatsReview({ numericValues }: StatsReviewProps) {
  // Ensure we have exactly 3 values (Clarity, Coherence, Engagement)
  const stats: Stat[] = [
    { name: "Clarity", value: numericValues[0] || "0", max: 100 },
    { name: "Coherence", value: numericValues[1] || "0", max: 100 },
    { name: "Engagement", value: numericValues[2] || "0", max: 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold">Overall Writing Score</h3>
        {/* Directly displaying the values */}
        <p className="text-4xl font-extrabold text-primary">
          {numericValues.length > 0 ? numericValues.reduce((sum, value) => sum + parseFloat(value), 0) / numericValues.length : 0}/100
        </p>
      </div>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.name} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{stat.name}</span>
              <span className="text-gray-500">
                {stat.value} / {stat.max}
              </span>
            </div>
            <Progress value={(parseFloat(stat.value) / stat.max) * 100} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
