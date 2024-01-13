import { Button } from "@/components/ui/button";
import { BROWSE_ROUTES } from "@/routes/browse";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { Clapperboard } from "lucide-react";
import Link from "next/link";
export interface ActionsProps {}

export default async function Actions(props: ActionsProps) {
  const user = await currentUser();
  return (
    <div className="flex justify-end items-center gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <SignInButton>
          <Button>Login</Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center flex-start text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`u/${user.username}`}>
              <Clapperboard size="20" className="lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl={BROWSE_ROUTES.PUBLIC.HOME} />
        </div>
      )}
    </div>
  );
}
