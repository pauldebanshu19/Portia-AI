import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Categories {
  briefSummary: string;
  strengths: string;
  improvements: string;
  nextSteps: string;
  suggestions: string;
}

interface WritingFeedbackProps {
  reviewData: Categories;
}

function formatContent(content: string) {
  // Split content at each '**', removing the '**' markers and trimming spaces
  const points = content.split("**").map((point) => point.trim()).filter(Boolean);

  return (
    <div>
      {points.map((point, index) => (
        <p key={index} className="text-sm mb-2">
          {point}
        </p>
      ))}
    </div>
  );
}

export function WritingFeedback({ reviewData }: WritingFeedbackProps) {
  const feedbackItems = [
    {
      title: "Brief Summary",
      content: reviewData.briefSummary,
    },
    {
      title: "Strengths",
      content: reviewData.strengths,
    },
    {
      title: "Areas for Improvement",
      content: reviewData.improvements,
    },
    {
      title: "Next Steps",
      content: reviewData.nextSteps,
    },
    {
      title: "Suggestions",
      content: reviewData.suggestions,
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold md:text-left">Writing Feedback</h3>
      {/* Vertical stack of feedback items */}
      <div className="space-y-4">
        {feedbackItems.map((item, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Format content with points separated by '**' */}
              {formatContent(item.content)}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
