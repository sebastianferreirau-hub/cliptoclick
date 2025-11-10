import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { VimeoPlayer, VimeoPlayerHandle } from "@/components/course/VimeoPlayer";
import { NotionEmbed } from "@/components/course/NotionEmbed";
import { Comments } from "@/components/course/Comments";
import { CourseSyllabus } from "@/components/course/CourseSyllabus";
import { ProgressSidebar } from "@/components/course/ProgressSidebar";
import { PaywallOverlay } from "@/components/PaywallOverlay";

export default function Lesson() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const playerRef = useRef<VimeoPlayerHandle>(null);
  const [lesson, setLesson] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState(false);
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
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/curso')}
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al curso
          </Button>
        </div>
      </div>

      {/* Three-pane layout */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left sidebar - Syllabus */}
          <aside className="hidden lg:block lg:col-span-3">
            <CourseSyllabus />
          </aside>

          {/* Main content - Video & Tabs */}
          <main className="lg:col-span-6 space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>

              {/* Video player */}
              {!hasAccess ? (
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <PaywallOverlay />
                </div>
              ) : (
                <VimeoPlayer
                  ref={playerRef}
                  videoId={lesson.vimeo_video_id}
                  lessonId={lesson.id}
                  title={lesson.title}
                />
              )}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="contenido" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="contenido">Contenido</TabsTrigger>
                {lesson.notion_page_id && (
                  <TabsTrigger value="recursos">Recursos</TabsTrigger>
                )}
                {lesson.comments_enabled && hasAccess && (
                  <TabsTrigger value="comentarios">Comentarios</TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="contenido" className="space-y-4 mt-6">
                {lesson.description && (
                  <div>
                    <h3 className="font-semibold mb-2">Descripción</h3>
                    <p className="text-muted-foreground">{lesson.description}</p>
                  </div>
                )}

                {lesson.learning_outcomes && Array.isArray(lesson.learning_outcomes) && lesson.learning_outcomes.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Qué aprenderás</h3>
                    <ul className="space-y-2">
                      {lesson.learning_outcomes.map((outcome: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5">✓</span>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </TabsContent>

              {lesson.notion_page_id && (
                <TabsContent value="recursos" className="mt-6">
                  <NotionEmbed pageId={lesson.notion_page_id} />
                </TabsContent>
              )}

              {lesson.comments_enabled && hasAccess && (
                <TabsContent value="comentarios" className="mt-6">
                  <Comments lessonId={lesson.id} playerRef={playerRef} />
                </TabsContent>
              )}
            </Tabs>
          </main>

          {/* Right sidebar - Progress */}
          <aside className="hidden lg:block lg:col-span-3">
            <ProgressSidebar currentLessonId={lesson.id} />
          </aside>
        </div>
      </div>
    </div>
  );
}
