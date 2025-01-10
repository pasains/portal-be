import { PostCreateParams, PostUpdateParams } from "@pasains/types/post";
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  updatePost,
} from "../repository/post";

export const createPostService = async (post: PostCreateParams) => {
  const newPost = await createPost(post);
  console.log("Photo Collage:", post.photoCollage);

  return newPost;
};

export const updatePostService = async (
  postId: bigint,
  post: PostUpdateParams,
) => {
  const updatedPost = await updatePost(postId, post);
  return updatedPost;
};

export const deletePostService = async (postId: bigint) => {
  const deletedPost = await deletePost(postId);
  return deletedPost;
};

export const getPostService = async (postId: bigint) => {
  const post = await getPost(postId);
  return post;
};

export const getAllPostService = async (props: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const allPost = await getAllPost({
    page: props.page,
    limit: props.limit,
    search: props.search,
  });
  return allPost;
};
