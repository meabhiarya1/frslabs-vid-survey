import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SurveyQuestion } from "@/types/survey";

type SurveyQuestionsCardProps = {
  questions: SurveyQuestion[];
};

export default function SurveyQuestionsCard({
  questions,
}: SurveyQuestionsCardProps) {
  return (
    <Card className="border-border/70 bg-card/88">
      <CardHeader>
        <span className="eyebrow w-fit">Question Set</span>
        <CardTitle className="font-display text-3xl leading-none">
          Questions
        </CardTitle>

        <CardDescription>
          The 5 Yes/No questions attached to this survey.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="space-y-4">
          {questions?.map((q, i: number) => (
            <li
              key={q.id}
              className="flex items-center gap-4 rounded-[1.5rem] border border-border/70 bg-background/62 p-4 shadow-[0_18px_40px_-30px_rgba(20,29,47,0.35)] backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-sm text-primary shadow-[0_14px_30px_-20px_rgba(214,119,61,0.8)]">
                {i + 1}
              </div>

              <p className="font-medium">{q.question_text}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
