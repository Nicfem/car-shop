import Link from "next/link";

export const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home Page</h1>
      <Link href={"/about"}>About page</Link>
    </main>
  );
};
