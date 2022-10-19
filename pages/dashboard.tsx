import { ListWithImage } from "components/ListWithImage";
import { Loader } from "components/Loader";
import { TimePeriodSelect } from "components/TimePeriodSelect";
import { useTopList } from "hooks/useTopList";

const Dashboard = () => {
  const { isLoading, topArtists, topTracks } = useTopList();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TimePeriodSelect />
          <div className="flex">
            <ListWithImage {...topArtists} />
            <ListWithImage {...topTracks} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
