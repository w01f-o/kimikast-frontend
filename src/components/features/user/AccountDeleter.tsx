"use client";

import { FC } from "react";
import { Button } from "@nextui-org/button";
import { UserRoundX } from "lucide-react";

const AccountDeleter: FC = () => {
  const clickHandler = () => {};

  return (
    <div>
      <Button
        color={"danger"}
        endContent={<UserRoundX />}
        onPress={clickHandler}
      >
        Удалить аккаунт
      </Button>
    </div>
  );
};

export default AccountDeleter;
