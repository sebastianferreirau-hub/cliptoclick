import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Lesson {
  id: string;
  slug: string;
  title: string;
  week_number: number;
  order_index: number;
  instructor_name: string | null;
  instructor_avatar_url: string | null;
}

interface ProgressSidebarProps {
  currentLessonId?: string;
}

export function ProgressSidebar({ currentLessonId }: ProgressSidebarProps) {
  const navigate = useNavigate();
  const [overallProgress, setOverallProgress] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);
  const [instructor, setInstructor] = useState<{ name: string; avatar: string | null } | null>(null);

  useEffect(() => {
    loadProgress();
  }, [currentLessonId]);

  async function loadProgress() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get all lessons
      const { data: lessons } = await supabase
        .from("lessons")
        .select("id, slug, title, week_number, order_index, instructor_name, instructor_avatar_url")
        .eq("publish_status", "live")
        .order("week_number")
        .order("order_index");

      if (!lessons) return;

      setTotalCount(lessons.length);

      // Get user progress
      const { data: progressData } = await supabase
        .from("lesson_progress")
        .select("lesson_id, completed_at")
        .eq("user_id", user.id);

      const completed = progressData?.filter(p => p.completed_at) || [];
      setCompletedCount(completed.length);
      setOverallProgress(lessons.length > 0 ? (completed.length / lessons.length) * 100 : 0);

      // Find next lesson
      if (currentLessonId) {
        const currentIndex = lessons.findIndex(l => l.id === currentLessonId);
        if (currentIndex !== -1 && currentIndex < lessons.length - 1) {
          setNextLesson(lessons[currentIndex + 1]);
        }

        // Get instructor info from current lesson
        const currentLesson = lessons[currentIndex];
        if (currentLesson?.instructor_name) {
          setInstructor({
            name: currentLesson.instructor_name,
            avatar: currentLesson.instructor_avatar_url
          });
        }
      }
    } catch (error) {
      console.error("Error loading progress:", error);
    }
  }

  return (
    <div className="sticky top-4 space-y-4">
      {/* Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="w-4 h-4" />
            Tu progreso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Completado</span>
              <span className="font-medium">
                {completedCount}/{totalCount}
              </span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
          <p className="text-xs text-muted-foreground">
            {Math.round(overallProgress)}% del curso completado
          </p>
        </CardContent>
      </Card>

      {/* Next Lesson Card */}
      {nextLesson && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Siguiente lección</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm font-medium line-clamp-2">{nextLesson.title}</p>
            <Button
              onClick={() => navigate(`/curso/${nextLesson.slug}`)}
              className="w-full"
              size="sm"
            >
              Continuar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Instructor Card */}
      {instructor && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Instructor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={instructor.avatar || undefined} />
                <AvatarFallback>
                  {instructor.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{instructor.name}</p>
                <p className="text-xs text-muted-foreground">Creador del curso</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
