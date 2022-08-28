import { request, gql } from "graphql-request";

const graphqlAPI = "http://localhost:5000/graphql";

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsList {
        id
        title
        body
        slug
        createdAt
        updatedAt
        author {
          username
          displayName
          avatar {
            url
          }
        }
        comment {
          id
          comment
          user {
            displayName
          }
        }
        featuredImage {
          url
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.postsList;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetRecentPosts {
      getRecentPosts(orderBy: "1", last: "3") {
        id
        title
        body
        slug
        createdAt
        updatedAt
        featuredImage {
          url
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.getRecentPosts;
};

export const getSimilarPosts = async (slug: string) => {
  const query = gql`
    query GetSimilarPosts($slug: String!) {
      getSimilarPosts(slug: $slug) {
        id
        title
        body
        slug
        createdAt
        updatedAt
        featuredImage {
          url
        }
        category {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.getSimilarPosts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categoryList {
        name
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.categoryList;
};

export const getPostsDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetail($slug: String!) {
      postBySlug(slug: $slug) {
        id
        title
        body
        slug
        createdAt
        updatedAt
        featuredImage {
          url
          id
        }
        author {
          id
          username
          displayName
          bio
          avatar {
            url
          }
        }
        comment {
          id
          comment
          user {
            displayName
          }
        }
        category {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.postBySlug;
};

export const submitComment = async (
  slug: number,
  comment: string,
  email: string,
  name: string
) => {
  const mutation = gql`
    mutation SubmitComment(
      $slug: String!
      $comment: String!
      $email: String!
      $name: String!
    ) {
      createComment(
        slug: $slug
        comment: $comment
        email: $email
        name: $name
      ) {
        id
        comment
        user {
          username
          email
        }
        post {
          title
        }
        createdAt
        updatedAt
      }
    }
  `;

  const result = await request(graphqlAPI, mutation, {
    slug,
    comment,
    email,
    name,
  });
  return result.createComment;
};

export const getComments = async (slug: string) => {
  const query = gql`
    query GetComments($slug: String!) {
      commentList(slug: $slug) {
        id
        comment
        user {
          displayName
          avatar {
            url
          }
        }
        post {
          title
        }
        createdAt
        updatedAt
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.commentList;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetFeaturedPosts {
      getFeaturedPosts {
        author {
          displayName
          avatar {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.getFeaturedPosts;
};

export const getCategoryPost = async (slug: string) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      getPostsByCategory(slug: $slug) {
        author {
          id
          bio
          displayName
          avatar {
            url
          }
        }
        createdAt
        slug
        title
        body
        featuredImage {
          url
        }
        category {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.getPostsByCategory;
};
