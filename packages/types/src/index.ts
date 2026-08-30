export interface WishlistItem {
  id: string;
  variant_id: string;
  product_id: string;
}

export interface Wishlist {
  id: string;
  customer_id?: string;
  items: WishlistItem[];
}

export interface ProductReview {
  id: string;
  product_id: string;
  customer_name: string;
  rating: number;
  title: string;
  content: string;
  is_approved: boolean;
  created_at?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "pending" | "read" | "resolved";
}

