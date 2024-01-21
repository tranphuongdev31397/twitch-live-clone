import { Button } from "@/components/ui/button";
import { BROWSE_ROUTES } from "@/routes/browse";
import { DASHBOARD_ROUTES } from "@/routes/dashboard";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { Clapperboard, Undo2 } from "lucide-react";
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
          <Link href={BROWSE_ROUTES.PUBLIC.HOME}>
            <Button
              variant="ghost"
              size="sm"
              className="flex cursor-pointer flex-row items-center flex-start text-muted-foreground hover:text-primary"
              startIcon={Undo2}
            >
              <span className="hidden lg:block">Exit</span>
            </Button>
          </Link>

          <UserButton afterSignOutUrl={BROWSE_ROUTES.PUBLIC.HOME} />
        </div>
      )}
    </div>
  );
}
