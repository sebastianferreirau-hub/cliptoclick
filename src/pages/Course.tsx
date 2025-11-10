import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, Lock, CheckCircle2, Star, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Lesson {
  id: string;
  title: string;
  slug: string;
  week_number: number;
  order_index: number;
  module_name: string;
  duration_seconds?: number;
  related_verticals: string[];
  vertical_relevance_score: Record<string, number>;
}

export default function Course() {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [hasAccess, setHasAccess] = useState(false);
  const [userVerticals, setUserVerticals] = useState<string[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      // Get user profile with access status and content cores
      const { data: profile } = await supabase
        .from('profiles')
        .select('has_access, content_cores')
        .eq('id', user.id)
        .single();
      
      setHasAccess(!!profile?.has_access);

      // Redirect to checkout if user doesn't have access
      if (!profile?.has_access) {
        navigate("/checkout");
        return;
      }

      // Extract user's vertical slugs from content_cores
      if (profile?.content_cores) {
        const cores = profile.content_cores as any;
        if (cores?.verticals) {
          const verticalSlugs = cores.verticals
            .map((v: any) => v.slug || v.name?.toLowerCase().replace(/\s+/g, '_'))
            .filter(Boolean);
          setUserVerticals(verticalSlugs);
        }
      }

      // Get lessons
      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('*')
        .eq('publish_status', 'live')
        .order('week_number')
        .order('order_index');

      setLessons((lessonsData || []).map(l => ({
        ...l,
        related_verticals: (l.related_verticals as any) || [],
        vertical_relevance_score: (l.vertical_relevance_score as any) || {}
      })));

      // Get user progress
      const { data: progressData } = await supabase
        .from('lesson_progress')
        .select('lesson_id, completion_percentage')
        .eq('user_id', user.id);

      const progressMap = (progressData || []).reduce((acc, p) => {
        acc[p.lesson_id] = p.completion_percentage;
        return acc;
      }, {} as Record<string, number>);
      
      setProgress(progressMap);
      setLoading(false);
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-4">
          <Skeleton className="h-12 w-1/2" />
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
      </div>
    );
  }

  // Group lessons by week
  const lessonsByWeek = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.week_number]) acc[lesson.week_number] = [];
    acc[lesson.week_number].push(lesson);
    return acc;
  }, {} as Record<number, Lesson[]>);

  const calculateRelevance = (lesson: Lesson) => {
    return lesson.related_verticals?.reduce((score, vertical) => {
      if (userVerticals.includes(vertical)) {
        return score + (lesson.vertical_relevance_score?.[vertical] || 0);
      }
      return score;
    }, 0) || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-heading gradient-text mb-2">
            Curso: Clips que convierten
          </h1>
          <p className="text-muted-foreground">
            8 semanas · Shorts primero · De cero a monetización
          </p>
        </div>

        {/* Overall Progress */}
        <Card className="glass-card p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Tu progreso general</h3>
            <span className="text-sm text-muted-foreground">
              {Object.keys(progress).length} / {lessons.length} lecciones
            </span>
          </div>
          <Progress 
            value={lessons.length > 0 ? (Object.keys(progress).length / lessons.length) * 100 : 0} 
            className="h-2"
          />
        </Card>

        {/* Lessons by Week */}
        <div className="space-y-8">
          {Object.entries(lessonsByWeek).map(([week, weekLessons]) => (
            <div key={week}>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="text-base px-3 py-1">
                  Semana {week}
                </Badge>
                <h2 className="text-xl font-heading">
                  {weekLessons[0]?.module_name}
                </h2>
              </div>

              <div className="space-y-3">
                {weekLessons
                  .sort((a, b) => {
                    // Sort by relevance to user's verticals (personalized)
                    const relevanceA = calculateRelevance(a);
                    const relevanceB = calculateRelevance(b);
                    if (relevanceB !== relevanceA) return relevanceB - relevanceA;
                    return a.order_index - b.order_index;
                  })
                  .map((lesson) => {
                    const relevance = calculateRelevance(lesson);
                    const isRelevant = relevance > 150;
                    const completion = progress[lesson.id] || 0;
                    const isCompleted = completion === 100;

                    return (
                      <Link key={lesson.id} to={`/curso/${lesson.slug}`}>
                        <Card className={`glass-card p-5 hover:shadow-glow transition-all cursor-pointer ${
                          isRelevant ? 'border-primary/30' : ''
                        }`}>
                          <div className="flex items-center gap-4">
                            {/* Icon */}
                            <div className="flex-shrink-0">
                              {isCompleted ? (
                                <CheckCircle2 className="w-8 h-8 text-success" />
                              ) : hasAccess ? (
                                <PlayCircle className="w-8 h-8 text-primary" />
                              ) : (
                                <Lock className="w-8 h-8 text-muted-foreground" />
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg truncate">
                                  {lesson.title}
                                </h3>
                                {isRelevant && (
                                  <Star className="w-4 h-4 text-primary fill-current" />
                                )}
                              </div>
                              
                              {/* Progress bar */}
                              {completion > 0 && (
                                <div className="w-full bg-muted rounded-full h-1.5 mb-2">
                                  <div
                                    className="bg-primary rounded-full h-1.5"
                                    style={{ width: `${completion}%` }}
                                  />
                                </div>
                              )}

                              {/* Metadata */}
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                {lesson.duration_seconds && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {Math.floor(lesson.duration_seconds / 60)} min
                                  </span>
                                )}
                                {isRelevant && (
                                  <span className="text-primary text-xs">
                                    Relevante para tus verticales
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
