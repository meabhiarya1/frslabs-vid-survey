import {
  Loader2,
  Camera,
  Check,
  X,
  AlertTriangle,
  ShieldCheck,
  Timer,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SurveyQuestion, SurveyStep } from "@/types/survey";

export interface SurveyData {
  title: string;
  questions: SurveyQuestion[];
}

export interface WelcomeStepProps {
  survey: SurveyData;
  onStart: () => void;
  isPending: boolean;
}

export interface RecordingStepProps {
  survey: SurveyData;
  currentQuestionIndex: number;
  totalQuestions: number;
  progressPct: number;
  uploadError: string | null;
  isFaceDetected: boolean;
  step: SurveyStep;
  isInteractionDisabled: boolean;
  onAnswer: (answer: "yes" | "no" | null) => void;
  timeLeft: number;
  retryCount: number;
  maxRetries: number;
}

export interface ErrorStepProps {
  onRetry: () => void;
}

export function WelcomeStep({ survey, onStart, isPending }: WelcomeStepProps) {
  return (
    <Card className="page-shell border-white/40">
      <CardHeader className="text-center pb-4">
        <span className="eyebrow mx-auto mb-4">Welcome</span>
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-linear-to-br from-primary via-chart-4 to-chart-2 shadow-[0_22px_44px_-24px_rgba(214,119,61,0.9)] ring-1 ring-white/40">
          <Camera className="w-7 h-7 text-primary-foreground" />
        </div>
        <CardTitle className="font-display text-4xl font-semibold leading-none">
          {survey.title}
        </CardTitle>
        <CardDescription className="text-base mt-3 leading-relaxed">
          This survey requires camera access. A short video segment will be
          recorded per question for automated face detection. No personal
          information is stored.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <div className="flex items-start gap-3 rounded-[1.5rem] border border-border/50 bg-background/70 p-4 shadow-[0_18px_40px_-30px_rgba(20,29,47,0.35)] backdrop-blur-sm">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">Privacy first.</span>{" "}
            We do not collect your name, email, or any personal identifiers.
            Only system metadata is recorded.
          </p>
        </div>
        <Button
          size="lg"
          className="w-full"
          onClick={onStart}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Camera className="mr-2 h-4 w-4" />
          )}
          Grant Camera Access & Begin
        </Button>
      </CardContent>
    </Card>
  );
}

export function PermissionStep() {
  return (
    <Card className="page-shell px-6 py-12 text-center">
      <Loader2 className="w-12 h-12 mx-auto mb-5 animate-spin text-primary" />
      <CardTitle className="text-xl mb-2">Requesting Permissions…</CardTitle>
      <CardDescription>
        Please allow camera access in your browser prompt.
      </CardDescription>
    </Card>
  );
}

export function RecordingStep({
  survey,
  currentQuestionIndex,
  totalQuestions,
  progressPct,
  uploadError,
  isFaceDetected,
  step,
  isInteractionDisabled,
  onAnswer,
  timeLeft,
  retryCount,
  maxRetries,
}: RecordingStepProps) {
  return (
    <div className="space-y-5">
      <Progress value={progressPct} className="h-1.5" />
      <Card className="page-shell relative bg-background/82">
        <CardHeader className="text-center pb-6">
          <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1 font-mono text-sm font-semibold text-destructive shadow-[0_14px_28px_-18px_rgba(190,65,56,0.55)]">
            <Timer className="w-3.5 h-3.5" />
            00:{timeLeft.toString().padStart(2, "0")}
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>
          <CardTitle className="font-display text-3xl leading-snug sm:text-4xl">
            {survey.questions[currentQuestionIndex]?.question_text}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {uploadError && (
            <div className="flex items-start gap-3 rounded-[1.25rem] border border-destructive/30 bg-destructive/10 p-4 text-destructive">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="text-sm font-medium leading-snug">{uploadError}</p>
            </div>
          )}
          {!isFaceDetected && step === "recording" && (
            <div className="flex items-start gap-3 rounded-[1.25rem] border border-destructive/30 bg-destructive/10 p-4 text-destructive">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">
                Face not clearly detected (or multiple faces). Please ensure a
                single face is visible.
              </p>
            </div>
          )}
          {retryCount > 0 && (
            <p className="text-sm text-muted-foreground">
              Retries: {retryCount}/{maxRetries}
            </p>
          )}
          <div className="grid grid-cols-2 gap-4">
            <Button
              size="lg"
              variant="outline"
              className="h-20 rounded-[1.75rem] border-2 text-xl font-medium hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive disabled:opacity-40"
              disabled={isInteractionDisabled}
              onClick={() => onAnswer("no")}
              aria-label="Answer No"
            >
              <X className="mr-2 w-5 h-5" />
              No
            </Button>
            <Button
              size="lg"
              className="h-20 rounded-[1.75rem] border-2 border-transparent text-xl font-medium hover:border-green-500/40 hover:bg-green-500/10 hover:text-green-600 disabled:opacity-40"
              disabled={isInteractionDisabled}
              onClick={() => onAnswer("yes")}
              aria-label="Answer Yes"
            >
              <Check className="mr-2 w-5 h-5" />
              Yes
            </Button>
          </div>
          {step === "submitting" && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Processing secure video segment…</span>
            </div>
          )}
        </CardContent>
      </Card>
      {step === "recording" && (
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
            Recording
          </span>
        </div>
      )}
    </div>
  );
}

export function CompletedStep() {
  return (
    <Card className="page-shell text-center">
      <CardHeader className="pb-4">
        <span className="eyebrow mx-auto mb-4">Complete</span>
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15 shadow-[0_22px_44px_-30px_rgba(34,197,94,0.8)]">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <CardTitle className="font-display text-4xl font-semibold leading-none">
          Survey Complete
        </CardTitle>
        <CardDescription className="text-base mt-3 leading-relaxed">
          Thank you for your time. Your responses and video segments have been
          securely recorded. You may now close this window.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function ErrorStep({ onRetry }: ErrorStepProps) {
  return (
    <Card className="page-shell text-center">
      <CardHeader className="pb-4">
        <span className="eyebrow mx-auto mb-4">Attention</span>
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 shadow-[0_22px_44px_-30px_rgba(190,65,56,0.8)]">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        <CardTitle className="font-display text-3xl font-semibold leading-none">
          Unable to Proceed
        </CardTitle>
        <CardDescription className="text-base mt-3 leading-relaxed">
          We could not access your camera. This survey requires video
          capabilities. Please check your browser permissions and retry.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
}
