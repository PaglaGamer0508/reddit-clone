"use client";

import React, { startTransition } from "react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { SubscribeToSubredditPayload } from "@/lib/validators/subreddit";
import axios, { AxiosError } from "axios";
import { useCustomToasts } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface SubscribeLeaveToggleProps {
  subredditId: string;
  subredditName: string;
  isSubscribed: boolean;
}

const SubscribeLeaveToggle: React.FC<SubscribeLeaveToggleProps> = ({
  subredditId,
  subredditName,
  isSubscribed,
}) => {
  const { loginToast } = useCustomToasts();
  const router = useRouter();

  //* Function for subscribing a subreddit
  const { mutate: subscribe, isLoading: isSubscriptionLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };

      const { data } = await axios.post("/api/subreddit/subscribe", payload);
      return data as string;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast;
        }
      }

      return toast({
        title: "There was a problem",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      return toast({
        title: "Subscribed",
        description: `You are now subscribed to r/${subredditName}`,
      });
    },
  });

  // !Function for unsubscribing a subreddit
  const { mutate: unsubscribe, isLoading: isUnsubscriptionLoading } =
    useMutation({
      mutationFn: async () => {
        const payload: SubscribeToSubredditPayload = {
          subredditId,
        };

        const { data } = await axios.post(
          "/api/subreddit/unsubscribe",
          payload
        );
        return data as string;
      },

      onError: (err) => {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            return loginToast;
          }
        }

        return toast({
          title: "There was a problem",
          description: "Something went wrong, please try again",
          variant: "destructive",
        });
      },
      onSuccess: () => {
        startTransition(() => {
          router.refresh();
        });

        return toast({
          title: "Unsubscribed",
          description: `You are now unsubscribed from r/${subredditName}`,
        });
      },
    });

  // Returning a button based on the subscription state
  return isSubscribed ? (
    <Button
      isLoading={isUnsubscriptionLoading}
      onClick={() => unsubscribe()}
      className="w-full mt-1 mb-4"
    >
      Leave Community
    </Button>
  ) : (
    <Button
      isLoading={isSubscriptionLoading}
      onClick={() => subscribe()}
      className="w-full mt-1 mb-4"
    >
      Join to Post
    </Button>
  );
};

export default SubscribeLeaveToggle;
