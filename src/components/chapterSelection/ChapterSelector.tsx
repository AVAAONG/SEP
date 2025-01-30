import { getServerSession } from '@/lib/auth/authOptions';
import authAdminOptions from '@/lib/auth/nextAuthAdminOptions/authAdminOptions';
import { getAdminChapter, getChapters } from '@/lib/db/utils/chapter';
import Selector from './Selector';
const ChapterSelector = async () => {
  const session = await getServerSession(authAdminOptions);
  const adminChapter = await getAdminChapter(session?.user?.id.id);
  const actualChapter = 'H0rvqSucbop6uozNUpuC-';
  const chapters = await getChapters();
  return <Selector chapters={chapters} currentAdminChapter={actualChapter} />;
};

export default ChapterSelector;
