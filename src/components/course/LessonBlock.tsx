import { VimeoPlayer } from "./VimeoPlayer";
import { PaywallOverlay } from "@/components/PaywallOverlay";
import { CheckCircle2, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LessonBlockProps {
  lesson: {
    id: string;
    title: string;
    description?: string;
    vimeo_video_id: string;
    learning_outcomes: string[];
    duration_seconds?: number;
    related_verticals?: string[];
    vertical_relevance_score?: Record<string, number>;
  };
  userVerticals?: string[];
  hasAccess: boolean;
  progress?: {
    completion_percentage: number;
    last_position_seconds: number;
    is_bookmarked: boolean;
  };
}

export function LessonBlock({ lesson, userVerticals = [], hasAccess, progress }: LessonBlockProps) {
  // Calculate vertical match score
  const matchScore = lesson.related_verticals?.reduce((score, vertical) => {
    if (userVerticals.includes(vertical)) {
      return score + (lesson.vertical_relevance_score?.[vertical] || 50);
    }
    return score;
  }, 0) || 0;

  const isHighlyRelevant = matchScore > 150;

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-heading gradient-text mb-2">{lesson.title}</h1>
          {lesson.description && (
            <p className="text-muted-foreground">{lesson.description}</p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {lesson.duration_seconds && (
            <Badge variant="secondary" className="gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(lesson.duration_seconds)}
            </Badge>
          )}
          {isHighlyRelevant && (
            <Badge className="bg-primary/20 text-primary border-0 gap-1">
              <Star className="w-3 h-3 fill-current" />
              Para ti
            </Badge>
          )}
        </div>
      </div>

      {/* Video Player or Paywall */}
      {hasAccess ? (
        <VimeoPlayer
          videoId={lesson.vimeo_video_id}
          lessonId={lesson.id}
          title={lesson.title}
        />
      ) : (
        <PaywallOverlay
          message="Suscríbete para acceder a todas las lecciones del curso."
          ctaText="Ver planes"
        />
      )}

      {/* Progress Indicator */}
      {progress && progress.completion_percentage > 0 && (
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Tu progreso</span>
            <span className="text-sm font-semibold">{progress.completion_percentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all"
              style={{ width: `${progress.completion_percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Learning Outcomes */}
      {lesson.learning_outcomes.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">En esta lección aprenderás:</h3>
          <ul className="space-y-3">
            {lesson.learning_outcomes.map((outcome, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Vertical Relevance (AI Connection) */}
      {isHighlyRelevant && lesson.related_verticals && (
        <div className="glass-card p-6 border-primary/30">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Relevante para tus verticales
          </h3>
          <div className="flex flex-wrap gap-2">
            {lesson.related_verticals
              .filter(v => userVerticals.includes(v))
              .map((vertical, i) => (
                <Badge key={i} className="bg-primary/10 text-primary border-primary/20">
                  {vertical.replace(/_/g, ' ')}
                  {lesson.vertical_relevance_score?.[vertical] && (
                    <span className="ml-1 opacity-70">
                      ({lesson.vertical_relevance_score[vertical]}%)
                    </span>
                  )}
                </Badge>
              ))}
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Esta lección se conecta directamente con los verticales que identificamos en tu perfil.
          </p>
        </div>
      )}
    </div>
  );
}
