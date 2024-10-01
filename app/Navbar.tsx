"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, Box, Container, DropdownMenu } from "@radix-ui/themes";
import { Spinner } from "@/components";

const Navbar = () => {
  return (
    <Container>
      <nav className="flex border-b mb-5 px-5 py-3 items-center justify-between">
        <NavLinks />
        <AuthStatus />
      </nav>
    </Container>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <div className="flex items-center space-x-6 justify-center">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-6 justify-between items-center">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              key={link.label}
              className={classnames({
                "text-zinc-950": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-900 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
const AuthStatus = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "unauthenticated") {
    return (
      <Link
        className="bg-blue-800 rounded-md py-1 px-4 text-slate-200"
        href="/api/auth/signin"
      >
        Sign in
      </Link>
    );
  }

  return (
    <Box className="border border-slate-700 rounded-md py-1 px-3">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {session?.user?.image && (
            <Avatar
              src={session?.user?.image}
              fallback="?"
              className="cursor-pointer"
            />
          )}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          sideOffset={5}
          className="bg-slate-800 rounded-md mt-3 border border-slate-700"
        >
          <DropdownMenu.Label>{session?.user?.email}</DropdownMenu.Label>
          <DropdownMenu.Item className=" transition-colors cursor-pointer">
            <Link href="/api/auth/signout">Sign out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default Navbar;
