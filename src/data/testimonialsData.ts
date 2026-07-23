export interface TestimonialItem {
  id: string;
  clientName: string;
  company: string;
  role: string;
  photo: string;
  rating: number;
  review: string;
  projectType: string;
  date: string;
  verified: boolean;
}

// Initial empty array for real reviews + sample CMS structure ready for Supabase
export const TESTIMONIALS: TestimonialItem[] = [
  // Future client reviews fetched from Supabase will map cleanly to this interface.
];

export const TESTIMONIALS_STATUS = {
  message: 'Client testimonials will appear here as projects are completed.',
  subtitle: 'We adhere strictly to real verified client feedback. As upcoming projects launch, verified reviews and video case studies will automatically populate directly from our CMS.'
};
