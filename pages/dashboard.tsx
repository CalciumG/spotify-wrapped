import { ListWithImage } from "components/ListWithImage";
import { Loader } from "components/Loader";
import { TimePeriodSelect } from "components/TimePeriodSelect";
import { useTopList } from "hooks/useTopList";
import { Tab } from "@headlessui/react";

const Dashboard = () => {
  const { isLoading, topArtists, topTracks } = useTopList();

  return (
    <div className="bg-painful-blue">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TimePeriodSelect />
          <Tab.Group>
            <Tab.List>
              <div className="flex w-full items-center justify-center text-horrid-green child:px-6">
                <Tab>Top Artists</Tab>
                <Tab>Top Songs</Tab>
              </div>
            </Tab.List>
            <Tab.Panels>
              <div className="flex items-center justify-center text-horrid-green">
                <Tab.Panel>
                  <ListWithImage {...topArtists} />
                </Tab.Panel>
                <Tab.Panel>
                  <ListWithImage {...topTracks} />
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
