import { Avatar, Badge, Card, Image } from '@mantine/core';

function LeaderboardPage() {
  const items = [1, 2, 3, 4, 5];
  return (
    <Card className="flex flex-col gap-2 my-5">
      <h2 className="text-center">Klasemen Pengguna</h2>
      <div className="grid grid-cols-1 gap-5">
        {items.map((item, index) => (
          <div key={item} className="flex flex-row items-center gap-5">
            <Avatar color="cyan" radius="xl">
              {index + 1}
            </Avatar>
            <div className="flex flex-row items-center gap-5 grow">
              <div className="relative h-12 w-12">
                <Image
                  radius="md"
                  src="https://picsum.photos/200"
                  alt="Random image"
                  fit="fill"
                  className="shadow-lg"
                />
              </div>
              <div className="flex flex-col grow">
                <div className="text-base font-bold">Name</div>
                <div className="text-xs text-gray-500">Username</div>
              </div>
              <Badge>50</Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default LeaderboardPage;
