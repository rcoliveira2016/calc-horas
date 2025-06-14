import { COOKIES_NAME_TOKEN_AUTH_GITHUB } from "~/shared/constants/names-cookies";
import { ProfileGithubApi } from "~/shared/types/server/api/profile/github-profile";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, COOKIES_NAME_TOKEN_AUTH_GITHUB);
  console.log({ token });
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Token não fornecido",
    });
  }

  const res = await $fetch<UserGithubApi>("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    name: res.name,
    urlAvatar: res.avatar_url,
  } satisfies ProfileGithubApi;
});
export interface UserGithubApi {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: PlanUserGithubApi;
}

export interface PlanUserGithubApi {
  name: string;
  space: number;
  private_repos: number;
  collaborators: number;
}
