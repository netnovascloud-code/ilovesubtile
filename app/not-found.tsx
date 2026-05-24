import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container py-24 text-center">
      <p className="text-sm font-medium text-brand-600">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink-900">Page not found</h1>
      <p className="mt-3 text-ink-500">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/">
          <Button>Back to home</Button>
        </Link>
        <Link href="/#tools">
          <Button variant="outline">See all tools</Button>
        </Link>
      </div>
    </div>
  );
}
