'use server'

import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";

export async function getAuthToken() {
    return await getCookie("tmdb_api_key", { cookies }) || '';
  }