import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
const Home = () => {
  return (
    <div className="p-4">
      <h1>Hello World</h1>
      <Button>
        <Link href="/issues/new">Create new Issue</Link>
      </Button>
    </div>
  );
};

export default Home;
