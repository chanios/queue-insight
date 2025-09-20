import { client } from "$lib/queqLib";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({}) => {
  const boardList = await client.reqBoardList();
  return { boardList };
};
