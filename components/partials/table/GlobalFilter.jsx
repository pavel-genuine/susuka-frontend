import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";

const GlobalFilter = ({ filter, setFilter, selectedDate }) => {
  //

  const [value, setValue] = useState(filter);
  
  const onChange = (e) => {
    setValue(e.target.value);
    setFilter(e.target.value || undefined);
  };

  useEffect(() => {
    if (selectedDate?.length) {
      const tLocal =
        selectedDate[0] - selectedDate[0].getTimezoneOffset() * 60 * 1000;
      setFilter(new Date(tLocal)?.toISOString()?.slice(0, 10));
    }
  }, [selectedDate ? selectedDate : null]);

  return (
    <div>
      <Textinput
        className="w-[200px]"
        value={value || ""}
        onChange={onChange}
        placeholder="search..."
      />
    </div>
  );
};

export default GlobalFilter;
