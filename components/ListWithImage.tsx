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
      <h2 className="p-6 text-3xl font-bold">{title}</h2>
      <ol>
        {data &&
          data?.map((item) => (
            <li
              className="flex items-center mx-4 my-2 child:pl-2 text-xl"
              key={item.name}
            >
              <img alt="ally" src={item.imageUrl} height={75} width={75} />
              <p>{item.name}</p>
            </li>
          ))}
      </ol>
    </div>
  );
};
