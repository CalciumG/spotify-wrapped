import { Listbox, Transition } from "@headlessui/react";
import {
  TimeRange,
  useSpotifyOptionsContext,
} from "context/spotifyOptionsContext";

export type TimePeriodSelectProps = {
  timeframe: TimeRange;
  label: string;
};

const periodOptions: TimePeriodSelectProps[] = [
  { timeframe: "short_term", label: "Last 4 weeks" },
  { timeframe: "medium_term", label: "Last 6 months" },
  { timeframe: "long_term", label: "Several years" },
];

export const TimePeriodSelect = () => {
  const { period, setPeriod } = useSpotifyOptionsContext();

  return (
    <div className="flex items-center justify-center p-6">
      <div className="mx-auto w-full max-w-xs">
        <Listbox
          as="div"
          className="space-y-1"
          value={period}
          onChange={setPeriod}
        >
          {({ open }) => (
            <>
              <Listbox.Label className="block text-lg font-medium leading-5 text-horrid-green">
                Time Range
              </Listbox.Label>
              <div className="relative">
                <span className="inline-block w-full rounded-md shadow-sm">
                  <Listbox.Button className="focus:shadow-outline-blue relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5">
                    <span className="block truncate capitalize">
                      {period.label}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>
                </span>

                <Transition
                  show={open}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
                >
                  <Listbox.Options
                    static
                    className="shadow-xs max-h-60 overflow-auto rounded-md py-1 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5"
                  >
                    {periodOptions.map((opt) => (
                      <Listbox.Option key={opt.label} value={opt}>
                        {({ selected, active }) => (
                          <div
                            className={`${
                              active
                                ? "bg-blue-600 text-white"
                                : "text-gray-900"
                            } relative cursor-default select-none py-2 pl-8 pr-4`}
                          >
                            <span
                              className={`${
                                selected ? "font-semibold" : "font-normal"
                              } block truncate`}
                            >
                              {opt.label}
                            </span>
                            {selected && (
                              <span
                                className={`${
                                  active ? "text-white" : "text-blue-600"
                                } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                              >
                                <svg
                                  className="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
};
