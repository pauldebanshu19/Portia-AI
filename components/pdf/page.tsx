"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { StatsModal } from "@/components/statsPDF"; // Importing StatsModal component
import { useRouter } from "next/navigation"

interface DoubtProps {
  goBack?: () => void;
}

export default function PdfReview() {
  const router = useRouter();
  const [driveLink, setDriveLink] = useState("");
  const [numericValues, setNumericValues] = useState<string[] | null>(null);
  const [reviewData, setReviewData] = useState<any | null>(null); // New state for the review data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNumericValues(null);
    setReviewData(null); // Reset the review data

    try {
      const response = await fetch("/api/v1/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driveLink }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to process PDF.");

      setNumericValues(data.numericValues); // Set the numeric values from the first response

      // Now make the second API call to /api/v1/pdf-review with the same driveLink
      const reviewResponse = await fetch("/api/v1/pdf-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driveLink }),
      });

      const reviewData = await reviewResponse.json();
      console.log(reviewData);
      if (!reviewResponse.ok) throw new Error(reviewData.error || "Failed to fetch review data.");

      setReviewData(reviewData); // Set the review data from the second API response
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border dark:border-gray-300 bg-white dark:bg-card rounded-xl border-gray-700 text-gray-900 dark:text-gray-100">
      <Button
        onClick={()=>router.back()}
        className="fixed top-4 right-4 mb-4 rounded-3xl text-gray-100 dark:text-black hover:text-gray-500 dark:hover:text-gray-400"
      >
        ← Back
      </Button>
      <h2 className="text-2xl font-normal mb-4">PDF Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={driveLink}
          onChange={(e) => setDriveLink(e.target.value)}
          placeholder="Enter Google Drive PDF Link(public)"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-gray-900 dark:bg-gray-300 dark:text-black rounded-md hover:bg-gray-600 dark:hover:bg-gray-400 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
      {error && <p className="text-red-500 dark:text-red-400 mt-4">{error}</p>}

      {/* Center and add spacing for StatsModal */}
      {numericValues && reviewData && (
        <div className="flex justify-center mt-6">
          <StatsModal numericValues={numericValues} reviewData={reviewData} />
        </div>
      )}
    </div>
  );
}
