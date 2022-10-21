import { ListWithImage } from "components/ListWithImage";
import { Loader } from "components/Loader";
import { TimePeriodSelect } from "components/TimePeriodSelect";
import { Tab } from "@headlessui/react";
import { useTopArtists } from "hooks/useTopArtists";

const Dashboard = () => {
  const { isLoading, resultInPeriod } = useTopArtists();

  return (
    <div className="bg-painful-blue">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TimePeriodSelect />
          <Tab.Group>
            <Tab.List>
              <div className="flex w-full items-center justify-center text-xl text-horrid-green child:px-6">
                <Tab>Top Artists</Tab>
                <Tab>Top Songs</Tab>
              </div>
            </Tab.List>
            <Tab.Panels>
              <div className="flex items-center justify-center text-horrid-green">
                <Tab.Panel>
                  <ListWithImage
                    {...(resultInPeriod as SpotifyApi.UsersTopArtistsResponse)}
                  />
                </Tab.Panel>
                <Tab.Panel>{/* <ListWithImage {...topTracks} /> */}</Tab.Panel>
              </div>
            </Tab.Panels>
          </Tab.Group>
        </>
      )}
    </div>
  );
};

export default Dashboard;
