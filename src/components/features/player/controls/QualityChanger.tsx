import { FC } from 'react';
import { Dropdown, DropdownItem, DropdownMenu } from '@nextui-org/dropdown';
import { DropdownTrigger, SharedSelection } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { SettingsIcon } from 'lucide-react';
import { playerStore } from '@/store/player.store';
import { useStore } from '@tanstack/react-store';
import { PlayerHls } from '@/types/anilibria/entities/Player.type';

const QualityChanger: FC = () => {
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

export default QualityChanger;
