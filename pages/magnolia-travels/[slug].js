import { useRouter } from "next/router";
import BlogHero from "../../components/BlogHero";
import Container from "@mui/material/Container";

const IMAGE_BASE = "http://localhost:8080";

const Post = ({ post }) => {
  const blogHeroContent = {
    title: post.name,
    description: post.description,
    image: IMAGE_BASE + post.image.renditions["960x720"].link,
    imageText: IMAGE_BASE + post.image.metadata.title,
  };

  return (
    <>
      <Container sx={{ py: 4 }} maxWidth="md">
        <BlogHero post={blogHeroContent} />
      </Container>

      <Container sx={{ py: 4 }} maxWidth="sm">
        <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
        <div><strong>Location</strong>: {post.location}</div>
        <div><strong>Author</strong>: {post.author}</div>
      </Container>
    </>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    "http://localhost:8080/magnoliaAuthor/.rest/delivery/tours/?limit=100&orderBy=mgnl:lastModified%20desc"
  );
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.results.map((post) => ({
    params: { slug: post["@name"] },
  }));
  //console.log(paths);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  //console.log(params)
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `http://localhost:8080/magnoliaAuthor/.rest/delivery/tours/magnolia-travels/${params.slug}`
  );
  const post = await res.json();

  // Pass post data to the page via props
  return { props: { post } };
}

export default Post;
