import Link from "next/link";
import { toast } from "./use-toast";
import { buttonVariants } from "@/components/ui/Button";

export const useCustomToasts = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "Login required.",
      description: "You need to be logged in to do that.",
      variant: "destructive",
      action: (
        <Link
          href="/sign-in"
          onClick={() => dismiss()}
          className={buttonVariants({ variant: "outline" })}
        >
          Log In
        </Link>
      ),
    });
  };

  return { loginToast };
};
