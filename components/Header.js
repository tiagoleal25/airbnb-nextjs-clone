import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 

import { GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon, UsersIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";

function Header({ placeholder }) {
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);
    const router = useRouter();

    const selectionRange = {
        endDate,
        key: "selection",
        startDate
    };

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    const resetInput = () => {
        setSearchInput("");
    };

     const search = () => {
         router.push({
             pathname: "/search",
             query: {
                 endDate: endDate.toISOString(),
                 location: searchInput,
                 noOfGuests,
                 startDate: startDate.toISOString()
             }
        });
    };

    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
            { /* Left */}
            <div className="relative flex items-center h-10 cursor-pointer my-auto" onClick={() => router.push("/")}>
                <Image
                  alt="logo"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="left"
                  src="https://links.papareact.com/qd3"
                />
            </div>

            { /* Middle - search */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input 
                  className="pl-5 bg-transparent outline-none flex-grow text-gray-600 placeholder-gray-400" 
                  onChange={(event) => setSearchInput(event.target.value)} 
                  placeholder={placeholder || "Start your search"}
                  type="text" 
                  value={searchInput} 
                />
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
            </div>

            { /* Right*/}
            <div className="flex space-x-4 items-center justify-end text-gray-500">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer" />
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6 cursor-pointer" />
                    <UserCircleIcon className="h-6 cursor-pointer" />
                </div>
            </div>

            {searchInput ? <div className="flex flex-col col-span-3 mx-auto">
                    <DateRangePicker minDate={new Date()} onChange={handleSelect} rangeColors={["#FD5B61"]} ranges={[selectionRange]} />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
                        <UsersIcon className="h-5" />
                        <input
                          className="w-12 pl-2 text-lg outline-none text-red-400"
                          min={1}
                          onChange={(event) => setNoOfGuests(event.target.value)}
                          type="number"
                          value={noOfGuests}
                        />
                </div>
                <div className="flex">
                    <button className="flex-grow text-gray-500" onClick={resetInput} type="button">Cancel</button>
                    <button className="flex-grow text-gray-400" onClick={search} type="button">Search</button>
                </div>
            
            </div> : null}
        </header>
    );
}

export default Header;
