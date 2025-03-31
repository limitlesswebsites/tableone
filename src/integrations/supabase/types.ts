export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      comment_votes: {
        Row: {
          comment_id: string | null
          created_at: string | null
          id: string
          user_id: string | null
          vote_type: string
        }
        Insert: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
          vote_type: string
        }
        Update: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_votes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          created_at: string | null
          downvotes: number | null
          id: string
          restaurant_id: string
          text: string
          upvotes: number | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          downvotes?: number | null
          id?: string
          restaurant_id: string
          text: string
          upvotes?: number | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          downvotes?: number | null
          id?: string
          restaurant_id?: string
          text?: string
          upvotes?: number | null
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      investment_interests: {
        Row: {
          created_at: string
          email: string
          id: string
          investment_amount: number
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          investment_amount: number
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          investment_amount?: number
        }
        Relationships: []
      }
      nomination_comments: {
        Row: {
          created_at: string
          downvotes: number | null
          id: string
          nomination_id: string
          text: string
          upvotes: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          downvotes?: number | null
          id?: string
          nomination_id: string
          text: string
          upvotes?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          downvotes?: number | null
          id?: string
          nomination_id?: string
          text?: string
          upvotes?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nomination_comments_nomination_id_fkey"
            columns: ["nomination_id"]
            isOneToOne: false
            referencedRelation: "restaurant_nominations"
            referencedColumns: ["id"]
          },
        ]
      }
      nomination_replies: {
        Row: {
          comment_id: string
          created_at: string
          downvotes: number | null
          id: string
          text: string
          upvotes: number | null
          user_id: string | null
        }
        Insert: {
          comment_id: string
          created_at?: string
          downvotes?: number | null
          id?: string
          text: string
          upvotes?: number | null
          user_id?: string | null
        }
        Update: {
          comment_id?: string
          created_at?: string
          downvotes?: number | null
          id?: string
          text?: string
          upvotes?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nomination_replies_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "nomination_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      nomination_votes: {
        Row: {
          created_at: string
          id: string
          nomination_id: string
          user_id: string | null
          vote_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          nomination_id: string
          user_id?: string | null
          vote_type: string
        }
        Update: {
          created_at?: string
          id?: string
          nomination_id?: string
          user_id?: string | null
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "nomination_votes_nomination_id_fkey"
            columns: ["nomination_id"]
            isOneToOne: false
            referencedRelation: "restaurant_nominations"
            referencedColumns: ["id"]
          },
        ]
      }
      ranking_history: {
        Row: {
          created_at: string
          down_votes: number
          id: string
          rank: number
          restaurant_id: string
          snapshot_date: string
          up_votes: number
        }
        Insert: {
          created_at?: string
          down_votes?: number
          id?: string
          rank: number
          restaurant_id: string
          snapshot_date: string
          up_votes?: number
        }
        Update: {
          created_at?: string
          down_votes?: number
          id?: string
          rank?: number
          restaurant_id?: string
          snapshot_date?: string
          up_votes?: number
        }
        Relationships: [
          {
            foreignKeyName: "ranking_history_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      refresh_logs: {
        Row: {
          details: Json | null
          error: string | null
          id: string
          refresh_date: string | null
          status: string
        }
        Insert: {
          details?: Json | null
          error?: string | null
          id?: string
          refresh_date?: string | null
          status: string
        }
        Update: {
          details?: Json | null
          error?: string | null
          id?: string
          refresh_date?: string | null
          status?: string
        }
        Relationships: []
      }
      replies: {
        Row: {
          comment_id: string | null
          created_at: string | null
          downvotes: number | null
          id: string
          text: string
          upvotes: number | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          comment_id?: string | null
          created_at?: string | null
          downvotes?: number | null
          id?: string
          text: string
          upvotes?: number | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          comment_id?: string | null
          created_at?: string | null
          downvotes?: number | null
          id?: string
          text?: string
          upvotes?: number | null
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "replies_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      reply_votes: {
        Row: {
          created_at: string | null
          id: string
          reply_id: string | null
          user_id: string | null
          vote_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          reply_id?: string | null
          user_id?: string | null
          vote_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          reply_id?: string | null
          user_id?: string | null
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "reply_votes_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "replies"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_nominations: {
        Row: {
          best_dow: string | null
          best_party_size: string | null
          best_time: string | null
          created_at: string
          cuisine: string
          description: string | null
          id: string
          image_url: string
          name: string
          neighborhood: string
          status: string
          submitted_by: string | null
          table_chance_percent: number | null
        }
        Insert: {
          best_dow?: string | null
          best_party_size?: string | null
          best_time?: string | null
          created_at?: string
          cuisine: string
          description?: string | null
          id?: string
          image_url: string
          name: string
          neighborhood: string
          status?: string
          submitted_by?: string | null
          table_chance_percent?: number | null
        }
        Update: {
          best_dow?: string | null
          best_party_size?: string | null
          best_time?: string | null
          created_at?: string
          cuisine?: string
          description?: string | null
          id?: string
          image_url?: string
          name?: string
          neighborhood?: string
          status?: string
          submitted_by?: string | null
          table_chance_percent?: number | null
        }
        Relationships: []
      }
      restaurant_ratings: {
        Row: {
          created_at: string
          device_id: string
          id: string
          rating: number
          restaurant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          device_id: string
          id?: string
          rating: number
          restaurant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          device_id?: string
          id?: string
          rating?: number
          restaurant_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      restaurant_votes: {
        Row: {
          created_at: string | null
          device_id: string | null
          id: string
          restaurant_id: string
          user_id: string | null
          vote_type: string
        }
        Insert: {
          created_at?: string | null
          device_id?: string | null
          id?: string
          restaurant_id: string
          user_id?: string | null
          vote_type: string
        }
        Update: {
          created_at?: string | null
          device_id?: string | null
          id?: string
          restaurant_id?: string
          user_id?: string | null
          vote_type?: string
        }
        Relationships: []
      }
      restaurants: {
        Row: {
          best_dow: string
          best_party_size: string
          best_time: string
          created_at: string
          cuisine: string
          id: string
          image: string
          is_in_top_50: boolean
          is_new: boolean
          last_updated: string | null
          name: string
          neighborhood: string
          original_id: number
          previous_rank: number | null
          rank: number
          rank_difference: Json | null
          table_chance: string
          table_chance_percent: number
          user_id: string | null
        }
        Insert: {
          best_dow: string
          best_party_size: string
          best_time: string
          created_at?: string
          cuisine: string
          id?: string
          image: string
          is_in_top_50?: boolean
          is_new?: boolean
          last_updated?: string | null
          name: string
          neighborhood: string
          original_id: number
          previous_rank?: number | null
          rank: number
          rank_difference?: Json | null
          table_chance: string
          table_chance_percent: number
          user_id?: string | null
        }
        Update: {
          best_dow?: string
          best_party_size?: string
          best_time?: string
          created_at?: string
          cuisine?: string
          id?: string
          image?: string
          is_in_top_50?: boolean
          is_new?: boolean
          last_updated?: string | null
          name?: string
          neighborhood?: string
          original_id?: number
          previous_rank?: number | null
          rank?: number
          rank_difference?: Json | null
          table_chance?: string
          table_chance_percent?: number
          user_id?: string | null
        }
        Relationships: []
      }
      review_comments: {
        Row: {
          comment_text: string
          created_at: string
          device_id: string
          id: string
          review_id: string
        }
        Insert: {
          comment_text: string
          created_at?: string
          device_id: string
          id?: string
          review_id: string
        }
        Update: {
          comment_text?: string
          created_at?: string
          device_id?: string
          id?: string
          review_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_comments_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      review_votes: {
        Row: {
          created_at: string
          device_id: string
          id: string
          review_id: string
          vote_type: string
        }
        Insert: {
          created_at?: string
          device_id: string
          id?: string
          review_id: string
          vote_type: string
        }
        Update: {
          created_at?: string
          device_id?: string
          id?: string
          review_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_votes_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          created_at: string
          cuisine: string
          device_id: string
          downvotes: number
          food_vote: string | null
          hype_vote: string | null
          id: string
          neighborhood: string
          price_vote: string | null
          rating: number | null
          restaurant_name: string
          review_text: string
          upvotes: number
          worth_it_score: number | null
        }
        Insert: {
          created_at?: string
          cuisine: string
          device_id: string
          downvotes?: number
          food_vote?: string | null
          hype_vote?: string | null
          id?: string
          neighborhood: string
          price_vote?: string | null
          rating?: number | null
          restaurant_name: string
          review_text: string
          upvotes?: number
          worth_it_score?: number | null
        }
        Update: {
          created_at?: string
          cuisine?: string
          device_id?: string
          downvotes?: number
          food_vote?: string | null
          hype_vote?: string | null
          id?: string
          neighborhood?: string
          price_vote?: string | null
          rating?: number | null
          restaurant_name?: string
          review_text?: string
          upvotes?: number
          worth_it_score?: number | null
        }
        Relationships: []
      }
      unique_visitors: {
        Row: {
          device_id: string
          most_recent_visit: string
          visit_count: number
        }
        Insert: {
          device_id: string
          most_recent_visit?: string
          visit_count?: number
        }
        Update: {
          device_id?: string
          most_recent_visit?: string
          visit_count?: number
        }
        Relationships: []
      }
      user_emails: {
        Row: {
          created_at: string | null
          device_id: string | null
          email: string
          id: string
          last_login: string | null
        }
        Insert: {
          created_at?: string | null
          device_id?: string | null
          email: string
          id?: string
          last_login?: string | null
        }
        Update: {
          created_at?: string | null
          device_id?: string | null
          email?: string
          id?: string
          last_login?: string | null
        }
        Relationships: []
      }
      user_restaurant_ratings: {
        Row: {
          ambiance_rating: number
          created_at: string
          device_id: string
          email: string | null
          food_rating: number
          id: string
          overall_rating: number
          price_rating: number
          rated_at: string
          restaurant_id: string
          service_rating: number
        }
        Insert: {
          ambiance_rating: number
          created_at?: string
          device_id: string
          email?: string | null
          food_rating: number
          id?: string
          overall_rating: number
          price_rating: number
          rated_at?: string
          restaurant_id: string
          service_rating: number
        }
        Update: {
          ambiance_rating?: number
          created_at?: string
          device_id?: string
          email?: string | null
          food_rating?: number
          id?: string
          overall_rating?: number
          price_rating?: number
          rated_at?: string
          restaurant_id?: string
          service_rating?: number
        }
        Relationships: []
      }
      visitor_stats: {
        Row: {
          count: number
          id: string
          last_updated: string | null
        }
        Insert: {
          count?: number
          id?: string
          last_updated?: string | null
        }
        Update: {
          count?: number
          id?: string
          last_updated?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      decrement_review_count: {
        Args: {
          row_id: string
          field_name: string
        }
        Returns: undefined
      }
      increment_review_count: {
        Args: {
          row_id: string
          field_name: string
        }
        Returns: undefined
      }
      increment_visitor_count: {
        Args: {
          device_id: string
        }
        Returns: number
      }
      increment_visitor_stats: {
        Args: {
          p_device_id: string
          p_timestamp: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
