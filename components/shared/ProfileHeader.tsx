"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: "User" | "Community";
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
}: Props) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(253);

  const handleFollowClick = () => {
    if (!isFollowing) {
      setFollowersCount(followersCount + 1);
    } else {
      setFollowersCount(followersCount - 1);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="logo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
          {accountId === authUserId && type !== "Community" && (
            <Link href="/profile/edit">
              <div className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
                <Image
                  src="/assets/edit.svg"
                  alt="logout"
                  width={16}
                  height={16}
                />

                {/* <p className="text-light-2 max-sm:hidden">Edit</p> */}
              </div>
            </Link>
          )}
        </div>

        <Link href="#">
          <div className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
            <Image src="/assets/rank.svg" alt="logout" width={50} height={50} />
          </div>
          <div className="flex justify-center mt-2">
            <p className="text-light-2 max-sm:hidden">Rank</p>
          </div>
        </Link>
      </div>

      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
      {type === "Community" && (
        <div className="flex justify-between mt-8">
          <div>
            <button
              className="flex cursor-pointer gap-3 rounded-lg bg-blue px-4 py-2"
              onClick={handleFollowClick}
            >
              <p className="text-white">
                {isFollowing ? "Following" : "Follow"}
              </p>
            </button>
          </div>

          <div>
            <p className="text-white flex justify-center mt-2 mr-5 font-bold">
              {followersCount}
            </p>
            <p className="text-white flex justify-center mt-1 mr-5">
              Followers
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
