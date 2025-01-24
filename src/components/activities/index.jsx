import React from "react";
import hotels from "../../assets/svg/Buildings.svg";
import ActivityCard from "../ui/activities-card";
import { data } from "../../data";
import AddActivityModal from "../ui/modals/add-activities-modal";
import { useData } from "../../context/data-context";

export default function Activities() {
  const { data, setIsActivityModalOpen } = useData();

  return (
    <div className="mt-4">
      <div className="pt-4 px-6 pb-4 bg-[#0054E4] rounded">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <img src={hotels} alt="hotels" />
            <h5 className="text-lg font-semibold text-white">Activities</h5>
          </div>
          <button
            onClick={() => setIsActivityModalOpen(true)}
            className="1920:h-[46px] h-[37px] 12920:text-base text-sm bg-white 1920:px-6 px-4 text-primary_600 rounded"
          >
            Add Activity
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {data.activities.map((activity, index) => (
            <ActivityCard key={index} activity={activity} />
          ))}
          {data.activities.length === 0 && (
            <div className="text-center py-8 text-white">
              No activities added yet. Click "Add Activity" to get started.
            </div>
          )}
        </div>

        <AddActivityModal />
      </div>
    </div>
  );
}