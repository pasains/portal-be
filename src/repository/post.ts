import { PostCreateParams, PostUpdateParams } from "@pasains/types/post";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPost = async (post: PostCreateParams) => {
  const newPost = await prisma.post.create({
    data: {
      title: post.title,
      type: post.type,
      headerPhoto: post.headerPhoto,
      place: post.place,
      writer: post.writer,
      date: post.date,
      generation: post.generation,
      firstParagraph: post.firstParagraph,
      secondParagraph: post.secondParagraph,
      thirdParagraph: post.thirdParagraph,
      fourthParagraph: post.fourthParagraph,
      firstImage: post?.firstImage,
      secondImage: post?.secondImage,
      thirdImage: post?.thirdImage,
      captionFirstImage: post?.captionFirstImage,
      captionSecondImage: post?.captionSecondImage,
      captionThirdImage: post?.captionThirdImage,
      photoCollage: post.photoCollage,
      captionPhotoCollage: post.captionPhotoCollage,
      quote: post.quote,
      nameQuote: post.nameQuote,
      createdAt: post.createdAt,
    },
  });
  return newPost;
};

export const updatePost = async (postId: bigint, post: PostUpdateParams) => {
  const updatePost = await prisma.post.update({
    where: { id: postId },
    data: {
      title: post.title,
      type: post.type,
      headerPhoto: post.headerPhoto,
      place: post.place,
      writer: post.writer,
      date: post.date,
      generation: post.generation,
      firstParagraph: post.firstParagraph,
      secondParagraph: post.secondParagraph,
      thirdParagraph: post.thirdParagraph,
      fourthParagraph: post.fourthParagraph,
      firstImage: post?.firstImage,
      secondImage: post?.secondImage,
      thirdImage: post?.thirdImage,
      captionFirstImage: post?.captionFirstImage,
      captionSecondImage: post?.captionSecondImage,
      captionThirdImage: post?.captionThirdImage,
      photoCollage: post.photoCollage,
      captionPhotoCollage: post.captionPhotoCollage,
      quote: post.quote,
      nameQuote: post.nameQuote,
    },
  });
  return updatePost;
};

export const deletePost = async (postId: bigint) => {
  const deletedPost = await prisma.post.delete({
    where: { id: postId },
  });
  return deletedPost;
};

export const getPost = async (postId: bigint) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });
  return post;
};

export const getAllPost = async (props: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const { page = 1, limit = 10 } = props;
  const filter = {} as any;
  if (props.search) {
    filter.title = { contains: props.search, mode: "insensitive" };
  }
  const allPost = await prisma.post.findMany({
    where: { ...filter, delete: false },
    orderBy: { date: "asc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalPost = await prisma.post.count({
    where: { deleted: false },
  });

  return {
    post: allPost,
    currentPage: page,
    totalPage: Math.ceil(totalPost / limit),
  };
};
