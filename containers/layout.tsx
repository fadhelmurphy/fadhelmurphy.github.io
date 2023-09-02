import React from "react";
import "../src/assets/global.css";
import { prefix } from "Consts/config";

interface Props {
  titlePage?: string;
  Header?: React.ReactNode;
  Footer?: React.ReactNode;
  children: React.ReactNode;
  content?: {
    [key: string]: string;
  };
}
const Layout = ({
  titlePage = "Home | Fadhel Ijlal Falah",
  content = {},
  Header,
  Footer,
  children,
}: Props) => {
  content.title = content?.title || titlePage;
  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href={`${prefix}/favicon.svg`} />
        <title>{content.title}</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      {Header}
      {children}
      {Footer}
    </>
  );
};

export default Layout;
