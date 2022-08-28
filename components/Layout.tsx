import { ReactNode } from "react";
import FeaturedPosts from "../sections/FeaturedPosts";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <FeaturedPosts />
      {children}
    </div>
  );
};

export default Layout;
