import { FC } from "react";
import { List } from "@/types/entities/List.type";
import { Card, CardBody } from "@nextui-org/card";
import Link from "next/link";
import { RoutePaths } from "@/enums/RoutePaths.enum";
import { Chip } from "@nextui-org/chip";

interface UserListProps {
  item: List;
}

export const defaultListNames = {
  planned: "Запланировано",
  watched: "Просмотрено",
  willBeWatching: "Буду смотреть",
  watchingNow: "Смотрю сейчас",
  abandoned: "Заброшено",
};

const UserList: FC<UserListProps> = ({ item }) => {
  return (
    <Card
      as={Link}
      href={`${RoutePaths.LIBRARY}/${item.id}`}
      isHoverable
      className="h-[150px]"
    >
      <CardBody>
        <div className="flex h-full items-end py-4 px-2">
          <div className="flex gap-2 items-center">
            <div>
              {defaultListNames[item.name as keyof typeof defaultListNames]}
            </div>
            <Chip>{item.animes.length}</Chip>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default UserList;
