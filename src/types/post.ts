import { PostType } from "@prisma/client";
export interface PostCreateParams {
  id: bigint;
  type: PostType;
  title: string;
  headerPhoto: string;
  place: string;
  writer: string;
  date: string;
  generation: string;
  firstParagraph: string;
  secondParagraph: string;
  thirdParagraph: string;
  fourthParagraph: string;
  firstImage: string;
  secondImage: string;
  thirdImage: string;
  captionFirstImage: string;
  captionSecondImage: string;
  captionThirdImage: string;
  photoCollage: string[];
  captionPhotoCollage: string;
  quote: string;
  nameQuote: string;
  createdAt: Date;
}

export interface PostUpdateParams {
  id: bigint;
  type: PostType;
  title: string;
  headerPhoto: string;
  place: string;
  writer: string;
  date: string;
  generation: string;
  firstParagraph: string;
  secondParagraph: string;
  thirdParagraph: string;
  fourthParagraph: string;
  firstImage: string;
  secondImage: string;
  thirdImage: string;
  captionFirstImage: string;
  captionSecondImage: string;
  captionThirdImage: string;
  photoCollage: string[];
  captionPhotoCollage: string;
  quote: string;
  nameQuote: string;
  updatedAt: Date;
}
