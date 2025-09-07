import { useState, useCallback, useEffect } from "react";

interface Contributor {
  username: string;
  name: string | null;
  avatar_url: string;
  profile_url: string;
  contributions: number;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  created_at: string;
}

export function useContributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [isLoadingContributors, setIsLoadingContributors] = useState(false);
  const [contributorsError, setContributorsError] = useState<string | null>(null);

  // Fetch contributors from API
  const fetchContributors = useCallback(async () => {
    setIsLoadingContributors(true);
    setContributorsError(null);

    try {
      const response = await fetch("/api/contributors");

      if (!response.ok) {
        throw new Error("Failed to fetch contributors");
      }

      const data = await response.json();
      setContributors(data.contributors || []);
    } catch (err) {
      setContributorsError(
        err instanceof Error ? err.message : "Failed to load contributors"
      );
    } finally {
      setIsLoadingContributors(false);
    }
  }, []);

  return {
    contributors,
    isLoadingContributors,
    contributorsError,
    fetchContributors,
  };
}
