import React, { useState } from "react";
import { IconArrowDownSolid } from "../../assets";
import { Popover } from "antd";

function ItemFilter({ title, content }) {
  const [visible, setVisible] = useState(false);

  const hide = () => {
    setVisible(!visible);
  };

  const handleVisibleChange = (newVisible) => {
		console.log("123")
    setVisible(newVisible);
  };

  return (
    <div className="wrapper-item-filter">
      <Popover
        placement="bottomLeft"
        overlayClassName="wrapper-item-filter"
        content={
          <div className="filter-sort-list filter-sort-content">
            {content?.map((item, index) => {
              return (
                <button
                  key={"btn-filter-item-" + index}
                  className="btn-filter-item"
                >
                  {item}
                </button>
              );
            })}
          </div>
        }
        trigger="click"
        visible={content?.length > 0 ? visible : false}
        onVisibleChange={handleVisibleChange}
      >
        <button className="btn-filter" onClick={hide}>
          <span>{title}</span>
          {content?.length > 0 && (
            <IconArrowDownSolid className="btn-filter-icon-down" />
          )}
        </button>
      </Popover>
    </div>
  );
}

export default ItemFilter;
