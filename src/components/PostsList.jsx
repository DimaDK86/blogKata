import { useGetPostsQuery } from "../redux/postsApi";

const PostsList = () => {
  const { data: posts, isLoading, isError } = useGetPostsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;

  return (
    <div>
      {posts?.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};
