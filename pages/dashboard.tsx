import { ListWithImage, TopListProps } from "components/ListWithImage";
import { Loader } from "components/Loader";
import useSpotify from "hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ISession } from "types/ISession";

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [topArtists, setTopArtists] = useState<TopListProps>();
  const session = useSession() as unknown as ISession;
  const spotifyApi = useSpotify();

  const fetchAritsts = async () => {
    const result = await spotifyApi.getMyTopArtists({
      time_range: "long_term",
    });
    let trimmed: TopListProps = {
      title: "Top Artists",
      data: result.body.items.map((item) => {
        return {
          imageUrl: item.images[2].url,
          name: item.name,
        };
      }),
    };
    setTopArtists(trimmed);
  };

  useEffect(() => {
    if (!session.data) return;
    setIsLoaded(false);
    spotifyApi.setAccessToken(session.data.user.accessToken);
    fetchAritsts().then(() => setIsLoaded(true));
  }, [session.data]);

  return (
    <div>{!isLoaded ? <Loader /> : <ListWithImage {...topArtists} />}</div>
  );
};

export default Dashboard;
