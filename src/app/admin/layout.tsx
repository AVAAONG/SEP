import '@/app/admin/admin.css';
import AdminLayoutShell from '@/components/admin/AdminLayoutShell';
import { hasExtendedNavigationAccess } from '@/components/admin/navigation/access';
import { getServerSession } from '@/lib/auth/authOptions';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  const hasExtendedAccess = hasExtendedNavigationAccess(session?.email);

  return <AdminLayoutShell hasExtendedAccess={hasExtendedAccess}>{children}</AdminLayoutShell>;
}
