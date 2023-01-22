import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PostsQuery } from "../generated/graphql";
import { VotesSection } from "./VotesSection";

export interface User {
  id: number;
  username: string;
}

export interface Creator {
  __typename?: "User" | undefined;
  id: number;
  username: string;
}

export interface CardProps {
  // Cant make Fragments to work (urqlClient doesnt inffer Query data type (Post) correctly)
  post: PostsQuery["posts"]["posts"][0];
}

export const PostCard: React.FC<CardProps> = ({ post }) => {
  const router = useRouter();
  // console.log(post);
  return (
    <Flex p={5} direction="row" shadow="md" borderWidth="1px">
      <VotesSection
        postId={post.id}
        points={post.points}
        voteStatus={post.voteStatus}
      />
      <LinkBox as="article" rounded="md" mt={3}>
        <LinkOverlay href={`/post/${post.id}`}>
          <Heading fontSize="xl">{post.title}</Heading>{" "}
          {`by ${post.creator.username}`}
          <Box mt={4} mb={2}>
            <Text>{`${post.textSnippet}...`}</Text>
          </Box>
        </LinkOverlay>
      </LinkBox>
    </Flex>
  );
};