"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatsReview } from "@/components/ui/stats-review";
import { WritingFeedback } from "@/components/ui/feedback";

interface Categories {
  briefSummary: string;
  strengths: string;
  improvements: string;
  nextSteps: string;
  suggestions: string;
}

interface StatsModalProps {
  numericValues: string[];
  reviewData: { categories: Categories };
}

export function StatsModal({ numericValues, reviewData }: StatsModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Writing Stats</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px] w-[90vw]">
        <DialogHeader>
          <DialogTitle>Your Writing Review</DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[80vh] pr-4">
          {/* Stack the components vertically */}
          <div className="space-y-6">
            {/* StatsReview appears on top */}
            <StatsReview numericValues={numericValues} />
            {/* WritingFeedback appears below */}
            <WritingFeedback reviewData={reviewData.categories} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
