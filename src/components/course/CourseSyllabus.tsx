import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Lock, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Lesson {
  id: string;
  slug: string;
  title: string;
  week_number: number;
  order_index: number;
  duration_seconds: number | null;
}

interface LessonProgress {
  lesson_id: string;
  completion_percentage: number;
  completed_at: string | null;
}

export function CourseSyllabus() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      // Get user access
      const { data: profile } = await supabase
        .from("profiles")
        .select("has_access")
        .eq("id", user.id)
        .single();

      setHasAccess(!!profile?.has_access);

      // Get all lessons
      const { data: lessonsData } = await supabase
        .from("lessons")
        .select("id, slug, title, week_number, order_index, duration_seconds")
        .eq("publish_status", "live")
        .order("week_number")
        .order("order_index");

      if (lessonsData) {
        setLessons(lessonsData);
        
        // Auto-expand current week
        const currentLesson = lessonsData.find(l => l.slug === slug);
        if (currentLesson) {
          setExpandedWeeks(new Set([currentLesson.week_number]));
        } else {
          setExpandedWeeks(new Set([1])); // Default to week 1
        }
      }

      // Get user progress
      if (profile?.has_access) {
        const { data: progressData } = await supabase
          .from("lesson_progress")
          .select("lesson_id, completion_percentage, completed_at")
          .eq("user_id", user.id);

        if (progressData) {
          setProgress(progressData);
        }
      }
    } catch (error) {
      console.error("Error loading syllabus:", error);
    } finally {
      setLoading(false);
    }
  }

  const weekGroups = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.week_number]) {
      acc[lesson.week_number] = [];
    }
    acc[lesson.week_number].push(lesson);
    return acc;
  }, {} as Record<number, Lesson[]>);

  function toggleWeek(week: number) {
    const newExpanded = new Set(expandedWeeks);
    if (newExpanded.has(week)) {
      newExpanded.delete(week);
    } else {
      newExpanded.add(week);
    }
    setExpandedWeeks(newExpanded);
  }

  function getLessonProgress(lessonId: string) {
    return progress.find(p => p.lesson_id === lessonId);
  }

  function isLessonComplete(lessonId: string) {
    const prog = getLessonProgress(lessonId);
    return prog?.completion_percentage === 100 || !!prog?.completed_at;
  }

  function formatDuration(seconds: number | null) {
    if (!seconds) return "";
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="sticky top-4 space-y-2">
      <h2 className="text-lg font-semibold mb-4">Contenido del curso</h2>

      {Object.entries(weekGroups)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([week, weekLessons]) => {
          const weekNumber = Number(week);
          const isExpanded = expandedWeeks.has(weekNumber);
          const completedCount = weekLessons.filter(l => isLessonComplete(l.id)).length;

          return (
            <div key={week} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleWeek(weekNumber)}
                className="w-full p-4 flex items-center justify-between bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <span className="font-medium">Semana {weekNumber}</span>
                  <span className="text-sm text-muted-foreground">
                    ({completedCount}/{weekLessons.length})
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div className="divide-y divide-border">
                  {weekLessons.map((lesson) => {
                    const isComplete = isLessonComplete(lesson.id);
                    const isCurrent = lesson.slug === slug;
                    const isLocked = !hasAccess && lesson.week_number > 1;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => !isLocked && navigate(`/curso/${lesson.slug}`)}
                        disabled={isLocked}
                        className={`w-full p-3 flex items-start gap-3 text-left transition-colors ${
                          isCurrent
                            ? "bg-primary/10 border-l-4 border-primary"
                            : "hover:bg-muted/50"
                        } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <div className="mt-0.5">
                          {isLocked ? (
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          ) : isComplete ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium line-clamp-2 ${
                            isCurrent ? "text-primary" : "text-foreground"
                          }`}>
                            {lesson.title}
                          </p>
                          {lesson.duration_seconds && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDuration(lesson.duration_seconds)}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
