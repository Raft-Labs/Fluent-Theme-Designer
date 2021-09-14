import { INavLinkGroup, INavStyles, Nav } from "@fluentui/react/lib/Nav";
import * as React from "react";

const navStyles: Partial<INavStyles> = {
  root: { minHeight: "90vh", borderRight: "1px solid #80808050" },
};

const navLinkGroups: INavLinkGroup[] = [
  {
    name: "System",
    links: [
      {
        key: "Display",
        name: "Display",
        url: "",
      },
      {
        key: "Sound",
        name: "Sound",
        url: "",
      },
      {
        key: "Notification Access",
        name: "Notification Access",
        url: "",
      },
    ],
  },
  {
    name: "Network and Internet",
    links: [
      {
        key: "Status",
        name: "Status",
        url: "",
      },
      {
        key: "Ethernet",
        name: "Ethernet",
        url: "",
      },
      {
        key: "Dial-up",
        name: "Dial-up",
        url: "",
      },
    ],
  },
];

export const Navbar: React.FunctionComponent = () => {
  return (
    <Nav
      styles={navStyles}
      ariaLabel="Nav example similar to one found in this demo page"
      groups={navLinkGroups}
    />
  );
};
