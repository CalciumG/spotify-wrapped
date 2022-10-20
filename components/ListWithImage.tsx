export type TopListProps = {
  title?: string | undefined;
  data?: {
    imageUrl: string;
    name: string;
  }[];
};

export const ListWithImage: React.FC<TopListProps> = ({ title, data }) => {
  return (
    <div>
      <h2 className="py-6 text-3xl font-bold">{title}</h2>
      <ol>
        {data &&
          data?.map((item) => (
            <li
              className="flex w-[300px] items-center py-2 text-lg sm:max-w-xs"
              key={item.name}
            >
              <img
                alt={item.name}
                src={item.imageUrl}
                height={70}
                width={70}
                className="shadow-xl"
              />
              <p className="pl-2 line-clamp-2">{item.name}</p>
            </li>
          ))}
      </ol>
    </div>
  );
};
