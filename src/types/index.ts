// Database types will be defined here since database.types.ts doesn't exist
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          phone: string | null;
          role: "JAMAAH" | "TRAVEL" | "STAFF" | "SUPER_ADMIN";
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name?: string | null;
          email?: string | null;
          phone?: string | null;
          role?: "JAMAAH" | "TRAVEL" | "STAFF" | "SUPER_ADMIN";
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          email?: string | null;
          phone?: string | null;
          role?: "JAMAAH" | "TRAVEL" | "STAFF" | "SUPER_ADMIN";
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      travels: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          logo_url: string | null;
          banner_url: string | null;
          address: string | null;
          ppiu_number: string | null;
          license_status: "PENDING" | "ACTIVE" | "SUSPENDED" | "REJECTED";
          setup_fee_status: "UNPAID" | "PENDING" | "PAID";
          setup_fee_amount: number;
          custom_domain: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          logo_url?: string | null;
          banner_url?: string | null;
          address?: string | null;
          ppiu_number?: string | null;
          license_status?: "PENDING" | "ACTIVE" | "SUSPENDED" | "REJECTED";
          setup_fee_status?: "UNPAID" | "PENDING" | "PAID";
          setup_fee_amount?: number;
          custom_domain?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          logo_url?: string | null;
          banner_url?: string | null;
          address?: string | null;
          ppiu_number?: string | null;
          license_status?: "PENDING" | "ACTIVE" | "SUSPENDED" | "REJECTED";
          setup_fee_status?: "UNPAID" | "PENDING" | "PAID";
          setup_fee_amount?: number;
          custom_domain?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      packages: {
        Row: {
          id: string;
          travel_id: string;
          title: string;
          description: string | null;
          price_per_pax: number;
          departure_date: string;
          return_date: string | null;
          duration_days: number;
          remaining_quota: number;
          total_quota: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          travel_id: string;
          title: string;
          description?: string | null;
          price_per_pax: number;
          departure_date: string;
          return_date?: string | null;
          duration_days: number;
          remaining_quota: number;
          total_quota: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          // UI/marketing fields (optional on insert)
          is_promo?: boolean;
          featured?: boolean;
          hotel_bintang?: number;
          promo_harga?: number;
          gambar_url?: string;
          nama?: string;
          durasi_hari?: number;
          kota_keberangkatan?: string;
          slug?: string;
        };
        Update: {
          id?: string;
          travel_id?: string;
          title?: string;
          description?: string | null;
          price_per_pax?: number;
          departure_date?: string;
          return_date?: string | null;
          duration_days?: number;
          remaining_quota?: number;
          total_quota?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          // UI/marketing fields (optional on update)
          is_promo?: boolean;
          featured?: boolean;
          hotel_bintang?: number;
          promo_harga?: number;
          gambar_url?: string;
          nama?: string;
          durasi_hari?: number;
          kota_keberangkatan?: string;
          slug?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          code: string;
          user_id: string;
          package_id: string;
          travel_id: string;
          total_amount: number;
          status: "PENDING" | "PAID" | "CANCELLED" | "COMPLETED" | "REFUNDED";
          channel: "main" | "subdomain";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          user_id: string;
          package_id: string;
          travel_id: string;
          total_amount: number;
          status?: "PENDING" | "PAID" | "CANCELLED" | "COMPLETED" | "REFUNDED";
          channel?: "main" | "subdomain";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          user_id?: string;
          package_id?: string;
          travel_id?: string;
          total_amount?: number;
          status?: "PENDING" | "PAID" | "CANCELLED" | "COMPLETED" | "REFUNDED";
          channel?: "main" | "subdomain";
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Functions: {
      get_admin_dashboard_kpi: {
        Args: Record<PropertyKey, never>;
        Returns: {
          total_gmv: number;
          total_members: number;
          total_vendors: number;
          active_vendors: number;
          pending_vendors: number;
          total_packages: number;
        };
      };
      get_monthly_transactions: {
        Args: Record<PropertyKey, never>;
        Returns: {
          month: string;
          revenue: number;
          volume: number;
        }[];
      };
      get_channel_distribution: {
        Args: Record<PropertyKey, never>;
        Returns: {
          name: string;
          value: number;
        }[];
      };
    };
  };
}

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: "JAMAAH" | "TRAVEL" | "STAFF" | "SUPER_ADMIN";
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export type Travel = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  banner_url: string | null;
  address: string | null;
  ppiu_number: string | null;
  license_status: "PENDING" | "ACTIVE" | "SUSPENDED" | "REJECTED";
  setup_fee_status: "UNPAID" | "PENDING" | "PAID";
  setup_fee_amount: number;
  custom_domain: string | null;
  created_at: string;
  updated_at: string;
};

export type Package = {
  id: string;
  travel_id: string;
  title: string;
  description: string | null;
  price_per_pax: number;
  departure_date: string;
  return_date: string | null;
  duration_days: number;
  remaining_quota: number;
  total_quota: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Additional marketing/UI fields
  is_promo: boolean;
  featured: boolean;
  hotel_bintang: number;
  promo_harga: number;
  gambar_url: string;
  nama: string;
  durasi_hari: number;
  kota_keberangkatan: string;
  slug: string;
};

export type Booking = {
  id: string;
  code: string;
  user_id: string;
  package_id: string;
  travel_id: string;
  total_amount: number;
  status: "PENDING" | "PAID" | "CANCELLED" | "COMPLETED" | "REFUNDED";
  channel: "main" | "subdomain";
  created_at: string;
  updated_at: string;
};

export type AdminDashboardKPI = {
  total_gmv: number;
  total_members: number;
  total_vendors: number;
  active_vendors: number;
  pending_vendors: number;
  total_packages: number;
};

export type MonthlyTransaction = {
  month: string;
  revenue: number;
  volume: number;
};

export type ChannelDistribution = {
  name: string;
  value: number;
};

// Newsletter subscription
export type Newsletter = {
  id: string;
  email: string;
  created_at: string;
};

// User type for Supabase auth user object
export type User = {
  id: string;
  email?: string | null;
  phone?: string | null;
  user_metadata?: {
    full_name?: string | null;
    avatar_url?: string | null;
  } | null;
  role?: "JAMAAH" | "TRAVEL" | "STAFF" | "SUPER_ADMIN";
};