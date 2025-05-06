import { 
  Card, 
  CardContent 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function EventDetails() {
  return (
      <Card className="p-4 max-w-xl">
        <CardContent className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">Event Date:</span> April 25, 2025
          </p>
          <p className="text-sm">
            <span className="font-medium">Request Date:</span> April 1, 2025
          </p>
          <p className="text-sm">
            <span className="font-medium">Event Type:</span> Online
          </p>
  
          <div className="text-sm space-y-1 pt-2">
            <p className="font-medium">Submitted Requirements:</p>
  
            <h2>Request Letter: </h2>
            <Button>
              <Download className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Request Letter.pdf</span>
              <span className="ml-auto text-xs text-gray-500">200 KB</span>
            </Button>
  
            <h2>Signed Conforme: </h2>
            <Button>
              <Download className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Signed Conforme.pdf</span>
              <span className="ml-auto text-xs text-gray-500">200 KB</span>
            </Button>
  
            <h2>Details of Activity:</h2>
            <p className="text-blue-600 underline text-sm">
              <a href="https://drive.google.com/file/d/" target="_blank" rel="noopener noreferrer">
                Details of Activity
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    )
}
