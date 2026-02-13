'use client'

import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle, } from "../ui/card";

export function LinkCard({ href, title, description, icon }: { href: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <Link href={href} className="block">
      <Card className="gap-3">
        <CardHeader>
          {icon}
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}