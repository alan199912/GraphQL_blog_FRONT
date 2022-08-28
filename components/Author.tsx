import React from "react";
import { User } from "../interfaces/author";
import Image from "next/image";

interface AuthorProps {
  author: User;
}

const Author = ({ author }: AuthorProps) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="absolute left-0 right-0 -top-14">
        <Image
          className="align-middle rounded-full"
          unoptimized
          height={100}
          width={100}
          src={author.avatar.url}
          alt={author.username}
        />
      </div>
      <h3 className="text-white my-4 text-xl font-bold">
        {author.displayName}
      </h3>
      <p className="text-white text-lg">{author.bio}</p>
    </div>
  );
};

export default Author;
