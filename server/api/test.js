import { IgApiClient } from "instagram-private-api";

export default defineEventHandler(async () => {
  const ig = new IgApiClient();
  ig.state.generateDevice("miltoncodes");

  await ig.account.login("miltoncollabo", "mileteas123");

  let commentsFeed = await ig.feed.mediaComments("2927320513370654547");
  let commentsResponse = await commentsFeed.items();
  const comments = commentsResponse.map((comment) => comment.text);
  return {data: comments };
});
