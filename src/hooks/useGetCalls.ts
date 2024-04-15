import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const client = useStreamVideoClient();
  useEffect(() => {
    const loadCalls = async () => {
      setLoading(true);
      try {
        const { calls }: any = await client?.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user?.id },
              { members: { $in: [user?.id] } },
            ],
          },
        });
        setCalls(calls);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadCalls();
  }, [client, user?.id]);
  const now = new Date();
  const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (endedAt && new Date(endedAt) < now) || !!endedAt;
  });
  const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });

  return {
    endedCalls,
    upcomingCalls,
    callRecordings: calls,
    loading,
  };
};
