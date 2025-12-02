// Updated: app/dashboard/layout.tsx (Remove duplication - now empty or redirect if needed)
import { redirect } from 'next/navigation';

export default function DashboardLayout() {
  redirect('/'); // Or remove this file if all under root
}