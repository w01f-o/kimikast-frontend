import { PlayerHls } from '@/entities/anime/model/Player.type';
import { playerStore } from '@/features/player/lib/stores/player.store';
import { Button } from '@heroui/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { SharedSelection } from '@heroui/react';
import { useStore } from '@tanstack/react-store';
import { SettingsIcon } from 'lucide-react';
import { FC } from 'react';

export const QualityChanger: FC = () => {
  const { quality } = useStore(playerStore);

  const changeQualityHandler = (value: SharedSelection) => {
    const newQuality = Array.from(value).join('') as keyof PlayerHls;

    playerStore.setState(prev => ({
      ...prev,
      quality: newQuality,
      isLoading: true,
    }));
  };

  return (
    <Dropdown className="min-w-32">
      <DropdownTrigger>
        <Button size={'md'} isIconOnly variant={'light'} title={'Качество'}>
          <SettingsIcon className="size-2/3" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={[quality]}
        onSelectionChange={changeQualityHandler}
      >
        <DropdownItem key="fhd" textValue="1080p">
          1080p
        </DropdownItem>
        <DropdownItem key="hd" textValue="720p">
          720p
        </DropdownItem>
        <DropdownItem key="sd" textValue="480p">
          480p
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
