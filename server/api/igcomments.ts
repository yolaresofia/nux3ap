import { IgApiClient } from "instagram-private-api";

export default defineEventHandler(async () => {
  const ig = new IgApiClient();
  ig.state.generateDevice("miltoncodesssz");

  const loggedInUser = await ig.account.login(
    process.env.IGUSER,
    process.env.IGPASS
  );
  const userFeed = ig.feed.user(loggedInUser.pk);
  const myPostsFirstPage = await userFeed.items();

  const allCommentsFeed = myPostsFirstPage.map(async (post) => {
    let commentsFeed = await ig.feed.mediaComments(post.id);
    let commentsResponse = await commentsFeed.items();
    const comments = commentsResponse.map((comment) => {
      return { text: comment.text, user: comment.user.username, timestamp: comment.created_at };
    });

    return comments;
  });
  const allComments = await Promise.all(allCommentsFeed);
  return { data: allComments.flat() };
});
