export interface Wish {
  id: string;
  occasion: 'birthday' | 'anniversary' | 'wedding' | 'festival';
  recipient_name: string;
  photo_urls: string[];
  generated_slug: string;
  created_at: string;
  greeting_text: string;
  personal_note: string;
  template_id: string;
  festival_type?: string;
  wedding_type?: string;
  custom_colors?: {
    background: string;
    text: string;
    accent: string;
  };
}

export interface WishFormData {
  occasion: 'birthday' | 'anniversary' | 'wedding' | 'festival';
  recipientName: string;
  photos: File[];
  greetingText?: string;
  personalNote: string;
  festivalType?: string;
  weddingType?: string;
  templateId?: string;
}
export interface Template {
  id: string;
  name: string;
  category: string;
  preview_url: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  animations: string[];
}