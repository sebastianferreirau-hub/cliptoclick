import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Clock, ThumbsUp, Flag, Pin, CheckCircle2, Reply, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import type { VimeoPlayerHandle } from "./VimeoPlayer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Comment {
  id: string;
  user_id: string;
  parent_id: string | null;
  body: string;
  ts_seconds: number | null;
  is_answer: boolean;
  is_pinned: boolean;
  upvotes: number;
  created_at: string;
  profiles?: { name?: string; email?: string };
}

interface CommentsProps {
  lessonId: string;
  playerRef: React.RefObject<VimeoPlayerHandle>;
}

export function Comments({ lessonId, playerRef }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"relevant" | "recent">("relevant");
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    checkAdmin();
    loadComments();

    const channel = supabase
      .channel(`lesson:${lessonId}:comments`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "lesson_comments",
          filter: `lesson_id=eq.${lessonId}`,
        },
        () => loadComments()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [lessonId]);

  async function checkAdmin() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    setCurrentUserId(user.id);
    
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();
    
    setIsAdmin(!!data);
  }

  async function loadComments() {
    const { data, error } = await supabase
      .from("lesson_comments")
      .select("*")
      .eq("lesson_id", lessonId)
      .order("is_pinned", { ascending: false })
      .order(sortBy === "relevant" ? "upvotes" : "created_at", { 
        ascending: sortBy === "relevant" ? false : false 
      });

    if (error) {
      console.error("Error loading comments:", error);
      return;
    }

    // Fetch user profiles separately
    if (data && data.length > 0) {
      const userIds = [...new Set(data.map(c => c.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, name, email")
        .in("id", userIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
      const enrichedComments = data.map(comment => ({
        ...comment,
        profiles: profileMap.get(comment.user_id)
      }));
      
      setComments(enrichedComments as any);
    } else {
      setComments([]);
    }
  }

  useEffect(() => {
    loadComments();
  }, [sortBy]);

  async function addComment() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Debes iniciar sesión para comentar");
      return;
    }

    if (!body.trim()) {
      toast.error("El comentario no puede estar vacío");
      return;
    }

    const ts = await playerRef.current?.getCurrentTime();

    const { error } = await supabase.from("lesson_comments").insert({
      lesson_id: lessonId,
      user_id: user.id,
      parent_id: replyTo,
      body: body.trim(),
      ts_seconds: ts || null,
    });

    if (error) {
      toast.error("Error al publicar comentario");
      console.error(error);
      return;
    }

    setBody("");
    setReplyTo(null);
    toast.success("Comentario publicado");
  }

  async function handleSeek(seconds: number) {
    await playerRef.current?.seekTo(seconds);
  }

  async function togglePin(commentId: string, currentState: boolean) {
    const { error } = await supabase
      .from("lesson_comments")
      .update({ is_pinned: !currentState })
      .eq("id", commentId);

    if (error) {
      toast.error("Error al fijar comentario");
      return;
    }
    toast.success(currentState ? "Comentario desanclado" : "Comentario anclado");
  }

  async function toggleAnswer(commentId: string, currentState: boolean) {
    const { error } = await supabase
      .from("lesson_comments")
      .update({ is_answer: !currentState })
      .eq("id", commentId);

    if (error) {
      toast.error("Error al marcar respuesta");
      return;
    }
    toast.success(currentState ? "Respuesta desmarcada" : "Marcado como respuesta");
  }

  async function deleteComment(commentId: string) {
    const { error } = await supabase
      .from("lesson_comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      toast.error("Error al eliminar comentario");
      return;
    }
    toast.success("Comentario eliminado");
  }

  async function reportComment(commentId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("comment_reports").insert({
      comment_id: commentId,
      reporter_id: user.id,
      reason: "Contenido inapropiado",
    });

    if (error) {
      toast.error("Error al reportar comentario");
      return;
    }
    toast.success("Comentario reportado");
  }

  async function upvoteComment(commentId: string) {
    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;

    const { error } = await supabase
      .from("lesson_comments")
      .update({ upvotes: comment.upvotes + 1 })
      .eq("id", commentId);

    if (error) {
      toast.error("Error al votar");
      return;
    }
  }

  const topLevelComments = comments.filter(c => !c.parent_id);
  const getReplies = (parentId: string) => comments.filter(c => c.parent_id === parentId);

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  function getUserName(comment: Comment) {
    const profile = comment.profiles as any;
    return profile?.name || profile?.email?.split("@")[0] || "Usuario";
  }

  function CommentItem({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) {
    const replies = getReplies(comment.id);
    const isOwn = comment.user_id === currentUserId;

    return (
      <div className={`${isReply ? "ml-8 mt-3" : "mt-4"}`}>
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium text-foreground">{getUserName(comment)}</span>
              
              {comment.ts_seconds !== null && (
                <button
                  onClick={() => handleSeek(comment.ts_seconds!)}
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <Clock className="w-3 h-3" />
                  {formatTime(comment.ts_seconds)}
                </button>
              )}

              {comment.is_pinned && (
                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                  <Pin className="w-3 h-3 mr-1" />
                  Fijado
                </Badge>
              )}

              {comment.is_answer && (
                <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Respuesta
                </Badge>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isAdmin && (
                  <>
                    <DropdownMenuItem onClick={() => togglePin(comment.id, comment.is_pinned)}>
                      <Pin className="w-4 h-4 mr-2" />
                      {comment.is_pinned ? "Desanclar" : "Anclar"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleAnswer(comment.id, comment.is_answer)}>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {comment.is_answer ? "Desmarcar respuesta" : "Marcar como respuesta"}
                    </DropdownMenuItem>
                  </>
                )}
                {(isAdmin || isOwn) && (
                  <DropdownMenuItem 
                    onClick={() => deleteComment(comment.id)}
                    className="text-destructive"
                  >
                    Eliminar
                  </DropdownMenuItem>
                )}
                {!isOwn && (
                  <DropdownMenuItem onClick={() => reportComment(comment.id)}>
                    <Flag className="w-4 h-4 mr-2" />
                    Reportar
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-sm text-foreground whitespace-pre-wrap mb-3">{comment.body}</p>

          <div className="flex items-center gap-3 text-sm">
            <button
              onClick={() => upvoteComment(comment.id)}
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{comment.upvotes}</span>
            </button>

            {!isReply && (
              <button
                onClick={() => setReplyTo(comment.id)}
                className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
              >
                <Reply className="w-4 h-4" />
                Responder
              </button>
            )}
          </div>
        </div>

        {replies.length > 0 && (
          <div className="space-y-2">
            {replies.map(reply => (
              <CommentItem key={reply.id} comment={reply} isReply />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Comentarios ({comments.length})
        </h3>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "relevant" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("relevant")}
          >
            Relevantes
          </Button>
          <Button
            variant={sortBy === "recent" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("recent")}
          >
            Recientes
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {replyTo && (
          <div className="flex items-center justify-between p-2 bg-muted rounded-md">
            <span className="text-sm text-muted-foreground">
              Respondiendo a comentario
            </span>
            <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)}>
              Cancelar
            </Button>
          </div>
        )}
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Comparte una duda o aporte (se añadirá el tiempo del video automáticamente)"
          className="min-h-[100px]"
        />
        <Button onClick={addComment} className="w-full">
          Enviar comentario
        </Button>
      </div>

      <div className="space-y-1">
        {topLevelComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}

        {comments.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            Sé el primero en comentar
          </p>
        )}
      </div>
    </div>
  );
}
