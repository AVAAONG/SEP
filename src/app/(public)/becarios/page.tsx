import Sample from '@/components/sample';
import { getAlumni } from '@/lib/db/utils/users';

const page = async () => {
  const scholars = await getAlumni();
  return <Sample scholars={scholars} />
};

export default page;

