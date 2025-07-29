import { fetchApi } from "./api"
import { useQuery } from "@tanstack/react-query";

type GithubRepoResponse = {
    stargazers_count: number;
};

export const useGithubStars = () => {
   return useQuery<GithubRepoResponse>({
    queryKey: ['stars'],
    queryFn: () => 
        fetchApi('https://api.github.com/repos/AyanAhmadKhan01/FlexReadme', 'GET'),
   })
}