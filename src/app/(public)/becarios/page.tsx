import { getScholars } from '@/lib/db/utils/users';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";

const page = async () => {
  const scholars = await getScholars();
  return (
    <div className="flex flex-col gap-2 min-h-screen p-8 ">
      <div className="flex flex-wrap gap-4 justify-center">
        {scholars.map((scholar) => {
          const lastNames = scholar?.last_names?.split(' ')!;
          const name = `${scholar?.first_names.split(' ')[0]} ${
            lastNames[0].length < 3 ? `${lastNames[0]} ${lastNames[1]}` : lastNames[0]
          } `;
          return (
            <Card className="max-w-[340px]">
              <CardHeader className="justify-between w-full">
                <div className="flex gap-5 ">
                  <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      {name}
                    </h4>
                    <h5 className="text-small tracking-tight text-default-400">
                      Estudiante de {scholar.collage_information[0]?.career} en la{' '}
                      {scholar.collage_information[0]?.collage}
                    </h5>
                  </div>
                </div>
                <Button
                  className={'bg-transparent text-foreground border-default-200'}
                  color="primary"
                  radius="full"
                  size="sm"
                  variant={'solid'}
                ></Button>
              </CardHeader>
              <CardBody className="px-3 py-0 text-small text-default-400"></CardBody>
              <CardFooter className="gap-3">
                <div className="flex gap-1">
                  <p className="font-semibold text-default-400 text-small">4</p>
                  <p className=" text-default-400 text-small">Following</p>
                </div>
                <div className="flex gap-1">
                  <p className="font-semibold text-default-400 text-small">97.1K</p>
                  <p className="text-default-400 text-small">Followers</p>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default page;
