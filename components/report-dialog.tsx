'use client'

import { useState } from 'react'
import { Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface ReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { reason: string; details: string }) => void
}

export function ReportDialog({ open, onOpenChange, onSubmit }: ReportDialogProps) {
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')

  const reasons = [
    { value: 'incorrect-info', label: 'Incorrect Information' },
    { value: 'closed', label: 'Vendor is Closed' },
    { value: 'wrong-price', label: 'Wrong Price' },
    { value: 'food-quality', label: 'Food Quality Issue' },
    { value: 'other', label: 'Other' },
  ]

  const handleSubmit = () => {
    onSubmit({ reason, details })
    setReason('')
    setDetails('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-primary" />
            Report an Issue
          </DialogTitle>
          <DialogDescription>
            Help us keep Linkdifood accurate by reporting issues with vendor information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <Label>What&apos;s the issue?</Label>
            <RadioGroup value={reason} onValueChange={setReason}>
              {reasons.map((r) => (
                <div key={r.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={r.value} id={r.value} />
                  <Label htmlFor={r.value} className="font-normal cursor-pointer">
                    {r.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Additional Details (optional)</Label>
            <Textarea
              id="details"
              placeholder="Tell us more about the issue..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!reason}>
            Submit Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
