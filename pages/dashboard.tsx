import { ListWithImage } from "components/ListWithImage";
import { Loader } from "components/Loader";
import { useTopArtists } from "hooks/useTopArtists";

const Dashboard = () => {
  const { isLoading, topArtists, topTracks } = useTopArtists("long_term");

  return (
    <div>
      {!isLoading ? (
        <Loader />
      ) : (
        <div className="flex">
          <ListWithImage {...topArtists} />
          <ListWithImage {...topTracks} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
