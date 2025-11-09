import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LessonBlock } from "@/components/course/LessonBlock";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function Lesson() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [userVerticals, setUserVerticals] = useState<string[]>([]);
  const [progress, setProgress] = useState<any>(null);
  const [navigation, setNavigation] = useState<{ prev?: string; next?: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!slug) return;

      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate("/auth");
          return;
        }

        // Get user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('has_access, content_cores')
          .eq('id', user.id)
          .single();
        
        setHasAccess(!!profile?.has_access);

        // Extract verticals
        if (profile?.content_cores) {
          const cores = profile.content_cores as any;
          if (cores?.verticals) {
            const verticalSlugs = cores.verticals
              .map((v: any) => v.slug || v.name?.toLowerCase().replace(/\s+/g, '_'))
              .filter(Boolean);
            setUserVerticals(verticalSlugs);
          }
        }

        // Get lesson
        const { data: lessonData, error } = await supabase
          .from('lessons')
          .select('*')
          .eq('slug', slug)
          .eq('publish_status', 'live')
          .maybeSingle();

        if (error) throw error;
        if (!lessonData) {
          toast.error("Lección no encontrada");
          navigate('/curso');
          return;
        }

        setLesson(lessonData);

        // Get user progress for this lesson
        const { data: progressData } = await supabase
          .from('lesson_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('lesson_id', lessonData.id)
          .maybeSingle();

        setProgress(progressData);

        // Get prev/next lessons
        const { data: allLessons } = await supabase
          .from('lessons')
          .select('slug, week_number, order_index')
          .eq('publish_status', 'live')
          .order('week_number')
          .order('order_index');

        if (allLessons) {
          const currentIndex = allLessons.findIndex(l => l.slug === slug);
          setNavigation({
            prev: allLessons[currentIndex - 1]?.slug,
            next: allLessons[currentIndex + 1]?.slug,
          });
        }
      } catch (error) {
        console.error('Error fetching lesson:', error);
        toast.error("Error al cargar la lección");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  if (!lesson) return null;

  return (
    <div className="min-h-screen bg-gradient-subtle py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/curso')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al curso
        </Button>

        {/* Lesson content */}
        <LessonBlock
          lesson={lesson}
          userVerticals={userVerticals}
          hasAccess={hasAccess}
          progress={progress}
        />

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          {navigation.prev ? (
            <Button
              variant="outline"
              onClick={() => navigate(`/curso/${navigation.prev}`)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Lección anterior
            </Button>
          ) : <div />}

          {navigation.next && (
            <Button
              onClick={() => navigate(`/curso/${navigation.next}`)}
              className="bg-gradient-primary"
            >
              Siguiente lección
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
