"use client";

import Link from "next/link";
import {
  Plus,
  Video,
  Users,
  Activity,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetSurveys } from "@/hooks/api/survey";

export default function DashboardClient() {
  const { data: surveys, isLoading } = useGetSurveys();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const activeSurveys = surveys?.filter((s) => s.is_active).length || 0;
  const totalSurveys = surveys?.length || 0;

  return (
    <div className="space-y-8">
      <section className="page-shell px-6 py-7 md:px-8 md:py-8">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top_left,rgba(214,119,61,0.2),transparent_60%)]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="eyebrow">Dashboard</span>
            <div className="space-y-3">
              <h2 className="section-title text-foreground">
                Run polished survey campaigns from one warm, focused workspace.
              </h2>
              <p className="section-copy max-w-xl">
                Launch new forms, monitor published activity, and review
                response quality without leaving the flow.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-medium text-muted-foreground shadow-[0_18px_40px_-30px_rgba(20,29,47,0.4)] backdrop-blur-xl">
              <span className="mr-2 text-foreground">{activeSurveys}</span>
              active right now
            </div>
            <Button asChild size="lg">
              <Link href="/new">
                <Plus className="mr-1 h-4 w-4" />
                Create Survey
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-primary/12 bg-linear-to-br from-card via-card to-primary/8">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Surveys</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSurveys}</div>
            <p className="text-xs text-muted-foreground">
              {activeSurveys} Active campaigns
            </p>
          </CardContent>
        </Card>
        <Card className="border-chart-2/18 bg-linear-to-br from-card via-card to-chart-2/8">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Submissions
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Pending backend stats API
            </p>
          </CardContent>
        </Card>
        <Card className="border-chart-4/20 bg-linear-to-br from-card via-card to-chart-4/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Face Score
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">
              Pending backend stats API
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4 border-border/70 bg-card/88">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em]">
              Recent Activity
            </span>
          </div>
          <CardTitle className="font-display text-3xl leading-none">
            Recent Surveys
          </CardTitle>
          <CardDescription>
            Keep your latest published campaigns close at hand.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!surveys || surveys.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-border/80 bg-muted/20 py-12 text-center">
              <div className="mx-auto flex max-w-105 flex-col items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary shadow-[0_20px_40px_-28px_rgba(214,119,61,0.85)]">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No surveys found</h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                  You haven&apos;t created any video surveys yet.
                </p>
                <Button asChild variant="outline">
                  <Link href="/new">
                    Create your first survey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {surveys.map((survey) => (
                <div
                  key={survey.id}
                  className="flex flex-col gap-4 rounded-[1.5rem] border border-border/70 bg-background/62 p-5 shadow-[0_18px_40px_-30px_rgba(20,29,47,0.35)] backdrop-blur-sm md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h4 className="text-lg font-semibold">{survey.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      Status: {survey.is_active ? "Published" : "Draft"}
                    </p>
                  </div>

                  <Button variant="outline" asChild>
                    <Link href={`/surveys/${survey.id}`}>View Details</Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
