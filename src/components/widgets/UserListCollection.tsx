import { FC } from "react";
import { List } from "@/types/entities/List.type";
import UserList from "@/components/entities/UserList";
import Col from "@/components/shared/layout/Col";

interface UserListCollectionProps {
  lists: List[];
}

const UserListCollection: FC<UserListCollectionProps> = ({ lists }) => {
  return lists.map((list) => (
    <Col xs={2} key={list.id}>
      <UserList item={list} />
    </Col>
  ));
};

export default UserListCollection;
