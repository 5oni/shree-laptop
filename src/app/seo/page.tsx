import { redirect } from 'next/navigation';

export default function SEOPagesIndex() {
  // Redirect to main website - SEO pages should not be publicly accessible
  redirect('/');
}
