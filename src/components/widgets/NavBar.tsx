import { FC } from "react";
import { appRoutes } from "@/constants/app.routes";
import { Link } from "@nextui-org/link";

const NavBar: FC = () => {
  return (
    <nav>
      <ul className="flex gap-4">
        {appRoutes.map(
          (route) =>
            route.isNavbar && (
              <li key={route.path}>
                <Link color={"foreground"} href={route.path}>
                  {route.name}
                </Link>
              </li>
            ),
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
