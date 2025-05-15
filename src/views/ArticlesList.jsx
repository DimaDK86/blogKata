import { usePosts } from "../../hooks";
import { ArticleCard, PaginationControls } from "../../components";

export const ArticlesList = () => {
  const { posts, isLoading, currentPage, totalPages, setPage } = usePosts();

  return (
    <div className="articles-list">
      {posts.map((post) => (
        <ArticleCard key={post.slug} {...post} />
      ))}
      <PaginationControls
        current={currentPage}
        total={totalPages}
        onChange={setPage}
      />
    </div>
  );
};
