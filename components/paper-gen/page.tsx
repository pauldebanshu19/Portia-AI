"use client"

import { useState } from "react"
import { pdf, Document, Page, Text } from "@react-pdf/renderer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

interface DoubtProps {
  goBack?: () => void
}

export default function PaperGen() {
  const router = useRouter();
  const [classname, setClassname] = useState("")
  const [subj, setSubj] = useState("")
  const [topic, setTopic] = useState("")
  const [marks, setMarks] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showPdfPreview, setShowPdfPreview] = useState(true) // Toggle for PDF preview

  // Inline styles for PDF components (react-pdf doesn't support Tailwind classes)
  const pageStyle = {
    padding: 40,
    backgroundColor: "#ffffff",
  }

  const headerStyle = {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    textTransform: "uppercase",
  } as const
  

  const textStyle = {
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 1.6,
  }

  // Generate the PDF by calling your API and rendering a Document with react-pdf.
  const generatePaper = async () => {
    if (!classname.trim() || !subj.trim() || !topic.trim()) {
      setError("Please fill in all fields")
      return
    }
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/v1/paper-gen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classname, subj, topic,marks }),
      })
      if (!response.ok) {
        throw new Error("Failed to generate paper")
      }
      const data = await response.json()
      const content = data.content

      // Create the PDF document using react-pdf components with inline styles.
      const MyDocument = () => (
        <Document>
          <Page style={pageStyle}>
            <Text style={headerStyle}>Question Paper</Text>
            <Text style={textStyle}>Class: {classname}</Text>
            <Text style={textStyle}>Subject: {subj}</Text>
            <Text style={textStyle}>Topic: {topic}</Text>
            <Text style={textStyle}>{content}</Text>
          </Page>
        </Document>
      )

      // Convert the PDF document to a blob.
      const blob = await pdf(<MyDocument />).toBlob()
      setPdfBlob(blob)
      setShowPdfPreview(true) // Ensure preview is visible
      setIsModalOpen(true)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // Download the generated PDF.
  const handleDownload = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `question_paper_${classname}_${subj}_${topic}.pdf`
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="text-gray-900 dark:text-white">
      <Button
        onClick={()=>router.back()}
        className="fixed top-4 right-4 mb-4 rounded-3xl text-gray-100 dark:text-black hover:text-gray-500 dark:hover:text-gray-400"
      >
        ← Back
      </Button>
      <Card className="max-w-lg mx-auto p-6 space-y-5 bg-white dark:bg-black shadow-lg rounded-lg">
        <CardHeader className="text-xl font-semibold">
          Generate Question Paper
        </CardHeader>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          Enter details below to generate your paper.
        </CardDescription>
        <div className="space-y-5">
          {/* Class Input */}
          <div className="space-y-2">
            <Label
              htmlFor="classname"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Class
            </Label>
            <Input
              id="classname"
              type="text"
              placeholder="Enter class"
              value={classname}
              onChange={(e) => setClassname(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md dark:bg-black dark:border-gray-300"
            />
          </div>

          {/* Subject Input */}
          <div className="space-y-2">
            <Label
              htmlFor="subj"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Subject
            </Label>
            <Input
              id="subj"
              type="text"
              placeholder="Enter subject"
              value={subj}
              onChange={(e) => setSubj(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md dark:bg-black dark:border-gray-300"
            />
          </div>

          {/* Topic Input */}
          <div className="space-y-2">
            <Label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Topic
            </Label>
            <Input
              id="topic"
              type="text"
              placeholder="Enter topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md dark:bg-black dark:border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="marks"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Marks
            </Label>
            <Input
              id="Marks"
              type="number"
              placeholder="Enter total marks"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md dark:bg-black dark:border-gray-300"
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
        <Button
          onClick={generatePaper}
          disabled={loading}
          className="w-full mt-5 py-2 bg-gray-900 text-white dark:text-black rounded-md hover:bg-gray-800 dark:bg-gray-200 dark:hover:bg-gray-300"
        >
          {loading ? "Generating..." : "Generate Paper"}
        </Button>
      </Card>

      {/* Modal using your custom Dialog components */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl w-full max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Preview Question Paper</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              onClick={() => setShowPdfPreview((prev) => !prev)}
            >
              {showPdfPreview ? "Hide PDF Preview" : "Show PDF Preview"}
            </Button>
          </div>
          {showPdfPreview && pdfBlob && (
            <div className="w-full h-[70vh] overflow-y-auto border rounded-md">
              <iframe
                src={URL.createObjectURL(pdfBlob)}
                className="w-full h-full border-0"
                title="PDF Preview"
              />
            </div>
          )}
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button onClick={handleDownload}>Download</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
