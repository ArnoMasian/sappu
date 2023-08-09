import { currentUser } from "@clerk/nextjs";

import UserCard from "../cards/UserCard";

import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUsers } from "@/lib/actions/user.actions";

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function RightSidebar(): Promise<JSX.Element | null> {
  const user = await currentUser();
  if (!user) return null;

  const similarMinds = await fetchUsers({
    userId: user.id,
    pageSize: 4,
  });

  const randomSimilarMinds = shuffleArray(similarMinds.users);

  const limitedRandomSimilarMinds = randomSimilarMinds.slice(0, 10);

  const suggestedCommunities = await fetchCommunities({ pageSize: 4 });

  const randomSuggestedCommunities = shuffleArray(
    suggestedCommunities.communities
  );

  const limitedRandomSuggestedCommunities = randomSuggestedCommunities.slice(
    0,
    10
  );

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>

        <div className="mt-7 flex w-[350px] flex-col gap-9">
          {limitedRandomSuggestedCommunities.length > 0 ? (
            <>
              {limitedRandomSuggestedCommunities.map((community) => (
                <UserCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType="Community"
                />
              ))}
            </>
          ) : (
            <p className="!text-base-regular text-light-3">
              No communities yet
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Similar Minds</h3>
        <div className="mt-7 flex w-[350px] flex-col gap-10">
          {limitedRandomSimilarMinds.length > 0 ? (
            <>
              {limitedRandomSimilarMinds.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType="User"
                />
              ))}
            </>
          ) : (
            <p className="!text-base-regular text-light-3">No users yet</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
