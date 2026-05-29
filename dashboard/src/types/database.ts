export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string
          order_number: string
          customer_name: string
          customer_email: string
          product: string
          category: string
          amount: number
          status: string
          region: string
          created_at: string
        }
        Insert: {
          id?: string
          order_number: string
          customer_name: string
          customer_email: string
          product: string
          category: string
          amount: number
          status: string
          region: string
          created_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          customer_name?: string
          customer_email?: string
          product?: string
          category?: string
          amount?: number
          status?: string
          region?: string
          created_at?: string
        }
      }
    }
  }
}
