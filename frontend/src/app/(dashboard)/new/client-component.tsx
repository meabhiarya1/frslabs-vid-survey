"use client";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useAddQuestion, useCreateSurvey } from "@/hooks/api/survey";
import {
  newSurveyFormSchema,
  type NewSurveyFormValues,
} from "@/lib/validations/survey";

export default function NewSurveyPage() {
  const router = useRouter();
  const createSurvey = useCreateSurvey();
  const addQuestions = useAddQuestion();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewSurveyFormValues>({
    resolver: zodResolver(newSurveyFormSchema),
    defaultValues: {
      title: "",
      questions: ["", "", "", "", ""],
    },
    mode: "onChange",
  });

  const onSubmit = async (data: NewSurveyFormValues) => {
    try {
      const survey = await createSurvey.mutateAsync({ title: data.title });

      await addQuestions.mutateAsync({
        surveyId: survey.id,
        questions: data.questions.map((q, idx) => ({
          question_text: q,
          order: idx + 1,
        })),
      });

      toast.success("Survey created successfully!");
      router.push(`/surveys/${survey.id}`);
    } catch (error) {
      console.error("Failed to create survey: ", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create survey",
      );
    }
  };

  const isSubmitting = createSurvey.isPending || addQuestions.isPending;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="page-shell px-6 py-7 md:px-8 md:py-8">
        <div className="max-w-2xl space-y-4">
          <span className="eyebrow">New Survey</span>
          <div className="space-y-3">
            <h2 className="section-title">
              Create a form that feels short, crisp, and demo-ready.
            </h2>
            <p className="section-copy">
              Use a simple title and five quick yes-or-no prompts so the survey
              stays fast on camera and easy to complete.
            </p>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="border-border/70 bg-card/88">
          <CardHeader className="border-b border-border/70 pb-5">
            <CardTitle className="font-display text-3xl leading-none">
              Survey Details
            </CardTitle>
            <CardDescription>
              All questions must be answerable with a simple Yes or No.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-6">
            <Field data-invalid={!!errors.title}>
              <FieldLabel htmlFor="title">Survey Title</FieldLabel>
              <Input
                id="title"
                placeholder="e.g., Remote Work Environment Check"
                {...register("title")}
                aria-invalid={!!errors.title}
              />
              {errors.title && <FieldError>{errors.title.message}</FieldError>}
            </Field>

            <div className="space-y-4 rounded-[1.75rem] border border-border/70 bg-background/65 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_20px_40px_-32px_rgba(20,29,47,0.35)] backdrop-blur-sm">
              <Label className="font-semibold">The 5 Questions</Label>
              <FieldGroup>
                {[...Array(5)].map((_, index) => {
                  const error = errors.questions?.[index];

                  return (
                    <Field key={index} data-invalid={!!error}>
                      <Input
                        placeholder={`Question ${index + 1}`}
                        {...register(`questions.${index}` as const)}
                        aria-invalid={!!error}
                      />
                      {error && <FieldError>{error.message}</FieldError>}
                    </Field>
                  );
                })}
              </FieldGroup>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create & Save Questions
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
