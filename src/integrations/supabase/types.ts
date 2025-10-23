export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_runs: {
        Row: {
          created_at: string
          id: string
          input_json: Json | null
          kind: string
          output_json: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          input_json?: Json | null
          kind: string
          output_json?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          input_json?: Json | null
          kind?: string
          output_json?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      analytics: {
        Row: {
          captured_at: string
          comments: number | null
          created_at: string
          ctr: number | null
          id: string
          impressions: number | null
          likes: number | null
          platform: string
          post_id: string
          retention_3s: number | null
          retention_50: number | null
          saves: number | null
          score: string | null
          shares: number | null
          user_id: string
          views: number | null
        }
        Insert: {
          captured_at?: string
          comments?: number | null
          created_at?: string
          ctr?: number | null
          id?: string
          impressions?: number | null
          likes?: number | null
          platform: string
          post_id: string
          retention_3s?: number | null
          retention_50?: number | null
          saves?: number | null
          score?: string | null
          shares?: number | null
          user_id: string
          views?: number | null
        }
        Update: {
          captured_at?: string
          comments?: number | null
          created_at?: string
          ctr?: number | null
          id?: string
          impressions?: number | null
          likes?: number | null
          platform?: string
          post_id?: string
          retention_3s?: number | null
          retention_50?: number | null
          saves?: number | null
          score?: string | null
          shares?: number | null
          user_id?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      assets: {
        Row: {
          captured_at: string | null
          created_at: string
          duration_sec: number | null
          id: string
          source: string | null
          storage_url: string | null
          tags: string[] | null
          title: string
          user_id: string
        }
        Insert: {
          captured_at?: string | null
          created_at?: string
          duration_sec?: number | null
          id?: string
          source?: string | null
          storage_url?: string | null
          tags?: string[] | null
          title: string
          user_id: string
        }
        Update: {
          captured_at?: string | null
          created_at?: string
          duration_sec?: number | null
          id?: string
          source?: string | null
          storage_url?: string | null
          tags?: string[] | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      inspo: {
        Row: {
          created_at: string
          id: string
          idea: string | null
          notes: string | null
          rel_engagement: string | null
          source_state: string | null
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          idea?: string | null
          notes?: string | null
          rel_engagement?: string | null
          source_state?: string | null
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          idea?: string | null
          notes?: string | null
          rel_engagement?: string | null
          source_state?: string | null
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          caption: string | null
          core_key: string | null
          cover_url: string | null
          created_at: string
          id: string
          notes: string | null
          platforms: string[] | null
          publish_at: string | null
          sla_due: string | null
          status: string
          title: string
          type: string
          updated_at: string
          user_id: string
          version: string | null
        }
        Insert: {
          caption?: string | null
          core_key?: string | null
          cover_url?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          platforms?: string[] | null
          publish_at?: string | null
          sla_due?: string | null
          status?: string
          title: string
          type: string
          updated_at?: string
          user_id: string
          version?: string | null
        }
        Update: {
          caption?: string | null
          core_key?: string | null
          cover_url?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          platforms?: string[] | null
          publish_at?: string | null
          sla_due?: string | null
          status?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
          version?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          ai_profile_summary: string | null
          content_cores: Json | null
          country: string | null
          created_at: string
          email: string | null
          goal_primary: string | null
          handle: string | null
          id: string
          lang: string | null
          name: string | null
          onboarding_completed: boolean | null
          raw_folder_link: string | null
          time_commitment: string | null
          updated_at: string
        }
        Insert: {
          ai_profile_summary?: string | null
          content_cores?: Json | null
          country?: string | null
          created_at?: string
          email?: string | null
          goal_primary?: string | null
          handle?: string | null
          id: string
          lang?: string | null
          name?: string | null
          onboarding_completed?: boolean | null
          raw_folder_link?: string | null
          time_commitment?: string | null
          updated_at?: string
        }
        Update: {
          ai_profile_summary?: string | null
          content_cores?: Json | null
          country?: string | null
          created_at?: string
          email?: string | null
          goal_primary?: string | null
          handle?: string | null
          id?: string
          lang?: string | null
          name?: string | null
          onboarding_completed?: boolean | null
          raw_folder_link?: string | null
          time_commitment?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "admin" | "brand" | "ops" | "compliance" | "finance"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["user", "admin", "brand", "ops", "compliance", "finance"],
    },
  },
} as const
