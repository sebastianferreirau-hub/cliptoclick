import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface VimeoPlayerProps {
  videoId: string;
  lessonId: string;
  title: string;
  onProgress?: (position: number, percentage: number) => void;
}

export interface VimeoPlayerHandle {
  getCurrentTime: () => Promise<number>;
  seekTo: (seconds: number) => Promise<void>;
}

export const VimeoPlayer = forwardRef<VimeoPlayerHandle, VimeoPlayerProps>(
  ({ videoId, lessonId, title, onProgress }, ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [player, setPlayer] = useState<any>(null);

    useImperativeHandle(ref, () => ({
      async getCurrentTime() {
        if (!player) return 0;
        try {
          return Math.floor(await player.getCurrentTime());
        } catch {
          return 0;
        }
      },
      async seekTo(seconds: number) {
        if (!player) return;
        try {
          await player.setCurrentTime(seconds);
        } catch (e) {
          console.error("Failed to seek:", e);
        }
      }
    }));

  useEffect(() => {
    // Load Vimeo Player SDK
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (iframeRef.current && (window as any).Vimeo) {
        const vimeoPlayer = new (window as any).Vimeo.Player(iframeRef.current);
        setPlayer(vimeoPlayer);

        // Track progress
        vimeoPlayer.on('timeupdate', async (data: any) => {
          const position = Math.floor(data.seconds);
          const percentage = Math.floor(data.percent * 100);
          
          if (onProgress) onProgress(position, percentage);

          // Auto-save progress every 10 seconds
          if (position % 10 === 0) {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
              await supabase.from('lesson_progress').upsert({
                user_id: user.id,
                lesson_id: lessonId,
                last_position_seconds: position,
                completion_percentage: percentage,
                watch_time_seconds: position,
              });
            }
          }
        });

        // Mark as completed when video ends
        vimeoPlayer.on('ended', async () => {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await supabase.from('lesson_progress').upsert({
              user_id: user.id,
              lesson_id: lessonId,
              completed_at: new Date().toISOString(),
              completion_percentage: 100,
            });
          }
        });
      }
    };

    return () => {
      if (player) player.destroy();
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [videoId, lessonId]);

    return (
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          ref={iframeRef}
          className="absolute inset-0 w-full h-full rounded-xl"
          src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
);
