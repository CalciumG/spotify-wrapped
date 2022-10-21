import { Tab } from "@headlessui/react";
import { useTopArtists } from "hooks/useTopArtists";
import { useTopSongs } from "hooks/useTopSongs";
import Router from "next/router";
import { useEffect } from "react";

import { ListWithImage } from "components/ListWithImage";
import { Loader } from "components/Loader";
import { TimePeriodSelect } from "components/TimePeriodSelect";

const Dashboard = () => {
  const { isLoading: artistsLoading, topArtistsInPeriod } = useTopArtists();
  const { isLoading: songsLoading, topSongsInPeriod } = useTopSongs();

  useEffect(() => {
    if (window.location.href.includes("error=OAuthCallback")) {
      Router.push("/error");
    }
  }, []);

  return (
    <div className="bg-painful-blue">
      {artistsLoading || songsLoading ? (
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
                  <ListWithImage {...topArtistsInPeriod} />
                </Tab.Panel>
                <Tab.Panel>
                  <ListWithImage {...topSongsInPeriod} />
                </Tab.Panel>
              </div>
            </Tab.Panels>
          </Tab.Group>
        </>
      )}
    </div>
  );
};

export default Dashboard;
