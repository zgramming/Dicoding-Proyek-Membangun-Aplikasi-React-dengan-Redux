import { Card, Image } from '@mantine/core';
import { useState } from 'react';
import ThreadInputModal from './ThreadInputModal';

function ThreadInput() {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Card withBorder className="flex flex-row items-center gap-3">
        <div className="relative w-10 h-10 bg-red-100 rounded-full">
          <Image
            src="https://picsum.photos/200"
            alt="Random image"
            fit="fill"
            radius="xl"
            className=""
          />
        </div>
        <div
          className="p-5 bg-slate-100 w-full rounded-full hover:cursor-pointer hover:bg-slate-200"
          onKeyDown={onOpen}
          onClick={onOpen}
          role="presentation"
        >
          <div className="font-bold text-xs">Apa yang sedang kamu pikirkan</div>
        </div>
      </Card>
      <ThreadInputModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default ThreadInput;
