import { Command } from "cmdk";
import { Link } from "react-router-dom";

export const CommandMenu = ({ open, setOpen }) => {
  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 bg-stone-950/50 backdrop-blur-[2px]"
      onClick={() => setOpen(false)}
    >
      <div className="h-screen flex  justify-center items-center">
        <div className="flex gap-4 items-center">
          <div className="px-[14px] pt-4 py-[18px] bg-primary_100 rounded text-black">
            <h4 className="font-semibold">Search Hotels</h4>
            <p className="text-sm mt-2 w-[270px]">
              Search your destination hotell today and get the perfect hotel for
              your events today
            </p>
            <Link to="/hotels">
              <button className="w-full h-[46px] bg-primary_600 rounded mt-[37px]">
                Search Hotels
              </button>
            </Link>
          </div>
          <div className="px-[14px] pt-4 py-[18px] bg-primary_600 rounded text-white">
            <h4 className="font-semibold">Search Flights</h4>
            <p className="text-sm mt-2 w-[270px]">
              Book your flight to yout=r destination today and get the perfect
              hotel for your events today
            </p>
            <Link to="/flight">
              {" "}
              <button className="w-full h-[46px] bg-white text-primary_600 rounded mt-[37px]">
                Search Flights
              </button>
            </Link>
          </div>

          <div className="px-[14px] pt-4 py-[18px] bg-primary_1100 rounded text-white">
            <h4 className="font-semibold">Serach Activities</h4>
            <p className="text-sm mt-2 w-[270px]">
              Line up your activities today and get the stay and enjoy your
              hotel for your events today
            </p>
            <Link to="/activities">
              <button className="w-full h-[46px] bg-primary_600 rounded mt-[37px]">
                Search Activities
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Command.Dialog>
  );
};
