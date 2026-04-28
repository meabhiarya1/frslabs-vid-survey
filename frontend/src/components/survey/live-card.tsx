"use client";

import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SurveyLiveCardProps = {
  surveyId: string;
};

export default function SurveyLiveCard({ surveyId }: SurveyLiveCardProps) {
  const url = `${window.location.origin}/survey/${surveyId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Public link copied");
  };

  return (
    <Card className="border-primary/20 bg-linear-to-br from-primary/8 via-card to-chart-2/10">
      <CardHeader>
        <span className="eyebrow w-fit">Published</span>
        <CardTitle className="font-display text-3xl leading-none text-primary">
          Survey is Live
        </CardTitle>

        <CardDescription>Share this link with participants</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 md:flex-row md:items-center">
        <code className="flex-1 rounded-2xl border border-border/70 bg-background/74 p-3 text-sm shadow-[0_18px_40px_-30px_rgba(20,29,47,0.35)]">
          {url}
        </code>

        <Button variant="outline" size="icon" onClick={copyLink}>
          <Copy className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon" asChild>
          <a href={url} target="_blank">
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
