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
      audit_logs: {
        Row: {
          action: string
          actor: string | null
          created_at: string | null
          entity_id: string
          entity_type: string
          id: number
          ip: unknown
          metadata: Json | null
        }
        Insert: {
          action: string
          actor?: string | null
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: number
          ip?: unknown
          metadata?: Json | null
        }
        Update: {
          action?: string
          actor?: string | null
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: number
          ip?: unknown
          metadata?: Json | null
        }
        Relationships: []
      }
      brands: {
        Row: {
          billing_country: string
          created_at: string | null
          kyb_status: string | null
          org_name: string
          user_id: string
        }
        Insert: {
          billing_country: string
          created_at?: string | null
          kyb_status?: string | null
          org_name: string
          user_id: string
        }
        Update: {
          billing_country?: string
          created_at?: string | null
          kyb_status?: string | null
          org_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "brands_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          brand_id: string
          budget_usd: number
          created_at: string | null
          end_date: string | null
          id: string
          name: string
          start_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          brand_id: string
          budget_usd: number
          created_at?: string | null
          end_date?: string | null
          id?: string
          name: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          brand_id?: string
          budget_usd?: number
          created_at?: string | null
          end_date?: string | null
          id?: string
          name?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["user_id"]
          },
        ]
      }
      creators: {
        Row: {
          country_code: string | null
          created_at: string | null
          kyc_status: string | null
          legal_name: string | null
          risk_score: number | null
          tax_form_type: string | null
          tax_id: string | null
          tax_status: string | null
          user_id: string
        }
        Insert: {
          country_code?: string | null
          created_at?: string | null
          kyc_status?: string | null
          legal_name?: string | null
          risk_score?: number | null
          tax_form_type?: string | null
          tax_id?: string | null
          tax_status?: string | null
          user_id: string
        }
        Update: {
          country_code?: string | null
          created_at?: string | null
          kyc_status?: string | null
          legal_name?: string | null
          risk_score?: number | null
          tax_form_type?: string | null
          tax_id?: string | null
          tax_status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "creators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      disputes: {
        Row: {
          created_at: string | null
          evidence_json: Json | null
          id: string
          offer_id: string
          raiser_type: string | null
          reason: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          evidence_json?: Json | null
          id?: string
          offer_id: string
          raiser_type?: string | null
          reason?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          evidence_json?: Json | null
          id?: string
          offer_id?: string
          raiser_type?: string | null
          reason?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "disputes_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
        ]
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
      integration_tokens: {
        Row: {
          access_token: string
          created_at: string
          expires_at: string | null
          id: string
          provider: string
          refresh_token: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token: string
          created_at?: string
          expires_at?: string | null
          id?: string
          provider: string
          refresh_token?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          provider?: string
          refresh_token?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      kyc_records: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          provider: string | null
          reference: string | null
          started_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          provider?: string | null
          reference?: string | null
          started_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          provider?: string | null
          reference?: string | null
          started_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      offers: {
        Row: {
          campaign_id: string
          created_at: string | null
          creator_id: string
          escrow_amount_usd: number
          id: string
          status: string | null
          terms_json: Json
          updated_at: string | null
        }
        Insert: {
          campaign_id: string
          created_at?: string | null
          creator_id: string
          escrow_amount_usd: number
          id?: string
          status?: string | null
          terms_json: Json
          updated_at?: string | null
        }
        Update: {
          campaign_id?: string
          created_at?: string | null
          creator_id?: string
          escrow_amount_usd?: number
          id?: string
          status?: string | null
          terms_json?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offers_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["user_id"]
          },
        ]
      }
      payout_methods: {
        Row: {
          created_at: string | null
          creator_id: string
          details_json: Json
          id: string
          type: string
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          creator_id: string
          details_json: Json
          id?: string
          type: string
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string
          details_json?: Json
          id?: string
          type?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "payout_methods_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["user_id"]
          },
        ]
      }
      payouts: {
        Row: {
          amount_usd: number
          corridor: string
          created_at: string | null
          creator_id: string
          currency: string
          fee_usd: number | null
          fx_rate: number | null
          id: string
          initiated_at: string | null
          net_local: number | null
          offer_id: string | null
          settled_at: string | null
          status: string | null
        }
        Insert: {
          amount_usd: number
          corridor: string
          created_at?: string | null
          creator_id: string
          currency: string
          fee_usd?: number | null
          fx_rate?: number | null
          id?: string
          initiated_at?: string | null
          net_local?: number | null
          offer_id?: string | null
          settled_at?: string | null
          status?: string | null
        }
        Update: {
          amount_usd?: number
          corridor?: string
          created_at?: string | null
          creator_id?: string
          currency?: string
          fee_usd?: number | null
          fx_rate?: number | null
          id?: string
          initiated_at?: string | null
          net_local?: number | null
          offer_id?: string | null
          settled_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payouts_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "payouts_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
        ]
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
          has_access: boolean
          id: string
          instagram_connected: boolean
          lang: string | null
          name: string | null
          notion_connected: boolean
          notion_workspace_id: string | null
          onboarding_completed: boolean | null
          onedrive_connected: boolean
          raw_folder_link: string | null
          snapchat_connected: boolean
          tiktok_connected: boolean
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
          has_access?: boolean
          id: string
          instagram_connected?: boolean
          lang?: string | null
          name?: string | null
          notion_connected?: boolean
          notion_workspace_id?: string | null
          onboarding_completed?: boolean | null
          onedrive_connected?: boolean
          raw_folder_link?: string | null
          snapchat_connected?: boolean
          tiktok_connected?: boolean
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
          has_access?: boolean
          id?: string
          instagram_connected?: boolean
          lang?: string | null
          name?: string | null
          notion_connected?: boolean
          notion_workspace_id?: string | null
          onboarding_completed?: boolean | null
          onedrive_connected?: boolean
          raw_folder_link?: string | null
          snapchat_connected?: boolean
          tiktok_connected?: boolean
          time_commitment?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      purchases: {
        Row: {
          amount: number
          created_at: string
          currency: string
          customer_id: string
          email: string
          guarantee_eligible: boolean
          id: string
          last_payment_at: string | null
          plan: string
          status: string
          subscription_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          customer_id: string
          email: string
          guarantee_eligible?: boolean
          id?: string
          last_payment_at?: string | null
          plan: string
          status?: string
          subscription_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          customer_id?: string
          email?: string
          guarantee_eligible?: boolean
          id?: string
          last_payment_at?: string | null
          plan?: string
          status?: string
          subscription_id?: string | null
          updated_at?: string
          user_id?: string | null
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
      decrypt_tax_id: { Args: { encrypted_tax_id: string }; Returns: string }
      encrypt_tax_id: { Args: { plaintext_tax_id: string }; Returns: string }
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
