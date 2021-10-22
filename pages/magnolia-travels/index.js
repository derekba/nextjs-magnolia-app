import React, { useState, useEffect } from "react";
import Headline from "../../components/Headline";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "next/link";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
//import "../components/TourList/TourList.module.css";

const API_ENDPOINT =
  "http://localhost:8080/magnoliaAuthor/.rest/delivery/tours/?limit=100&orderBy=mgnl:lastModified%20desc";
const IMAGE_BASE = "http://localhost:8080";


const insightsPage = ({ posts }) => {
  return (
    <>
      <Container sx={{ py: 4 }} maxWidth="md">
        <Headline text="Post Listing Page" />
      </Container>
      <Container sx={{ py: 8 }} maxWidth="md">
        {posts.results.length > 0 ? (
          <Grid container spacing={4}>
            {posts.results.map((post) => (
              <Grid item key={post["@id"]} xs={12} sm={6} md={4}>
                <Link
                    as={`/magnolia-travels/${post['@name']}`}
                    href="/magnolia-travels/[slug]"
                    passHref
                  >
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <Image
                      src={IMAGE_BASE + post.image.renditions["480x360"].link}
                      alt="..."
                      width={480}
                      height={360}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {post.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {post.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        ) : (
          <h2>No Tours found</h2>
        )}
      </Container>
    </>
  );
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(API_ENDPOINT);
  const posts = await res.json();

  // By returning { props: { posts } }, the insightsPage component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}

export default insightsPage;
