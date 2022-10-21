export type TopListProps = {
  title?: string | undefined;
  data?: {
    imageUrl: string;
    name: string;
  }[];
};

export const ListWithImage: React.FC<SpotifyApi.UsersTopArtistsResponse> = ({
  items,
}) => {
  const trimmed: TopListProps = {
    title: "Top Artists",
    data: items.map((item) => {
      return {
        imageUrl: item.images[2].url,
        name: item.name,
      };
    }),
  };
  return (
    <div>
      <h2 className="py-6 text-3xl font-bold">{trimmed.title}</h2>
      <ol>
        {trimmed.data &&
          trimmed.data?.map((item) => (
            <li
              className="flex w-[300px] items-center py-2 text-lg sm:max-w-xs"
              key={item.name}
            >
              <img
                alt={item.name}
                src={item.imageUrl}
                height={64}
                width={64}
                className="shadow-xl"
              />
              <p className="pl-2">{item.name}</p>
            </li>
          ))}
      </ol>
    </div>
  );
};
