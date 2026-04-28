"use client";

import Link from "next/link";
import { Plus, Video, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetSurveys } from "@/hooks/api/survey";

export default function SurveysPage() {
  const { data: surveys, isLoading } = useGetSurveys();

  return (
    <div className="flex-1 space-y-8">
      <section className="page-shell px-6 py-7 md:px-8 md:py-8">
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="eyebrow">Campaigns</span>
            <div className="space-y-3">
              <h2 className="section-title">Every survey, styled and ready to publish.</h2>
              <p className="section-copy max-w-xl">
                Jump between drafts, live links, and response review without
                losing context.
              </p>
            </div>
          </div>

          <Button asChild size="lg">
            <Link href="/new">
              <Plus className="mr-1 h-4 w-4" />
              Create Survey
            </Link>
          </Button>
        </div>
      </section>

      <Card className="border-border/70 bg-card/88">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em]">
              Library
            </span>
          </div>
          <CardTitle className="font-display text-3xl leading-none">
            All Surveys
          </CardTitle>
          <CardDescription>
            View and manage all your created surveys.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : !surveys || surveys.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Video className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <p>No surveys found. Create one to get started.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {surveys.map((survey) => (
                <Card
                  key={survey.id}
                  className="flex flex-col justify-between border-border/70 bg-linear-to-br from-card to-background/76"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{survey.title}</CardTitle>
                    <CardDescription>
                      {survey.is_active ? (
                        <span className="font-medium text-green-600">
                          Published
                        </span>
                      ) : (
                        <span className="font-medium text-orange-500">
                          Draft
                        </span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/surveys/${survey.id}`}>Manage</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
