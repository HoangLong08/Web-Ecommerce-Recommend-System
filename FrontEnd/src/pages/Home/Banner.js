import React from "react";
import { IconArrowRightSolid, IconPhone } from "../../assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

const categories = [
  {
    title: "Điên thoại",
    image: <IconPhone />,
    list: [
      {
        title: "laptop thương hiêu",
        listSub: [
          {
            title: "Apple",
          },
          {
            title: "Acer",
          },
          {
            title: "Asus",
          },
        ],
      },
      {
        title: "laptop thương hiêu",
        listSub: [
          {
            title: "Apple",
          },
          {
            title: "Acer",
          },
          {
            title: "Asus",
          },
        ],
      },
      {
        title: "laptop thương hiêu",
        listSub: [
          {
            title: "Apple",
          },
          {
            title: "Acer",
          },
          {
            title: "Asus",
          },
        ],
      },
      {
        title: "laptop thương hiêu",
        listSub: [
          {
            title: "Apple",
          },
          {
            title: "Acer",
          },
          {
            title: "Asus",
          },
        ],
      },
    ],
  },
  {
    title: "Lap top",
    image: <IconPhone />,
    list: [
      {
        title: "laptop thương hiêu",
        listSub: [
          {
            title: "Apple",
          },
          {
            title: "Acer",
          },
          {
            title: "Asus",
          },
        ],
      },
    ],
  },
  {
    title: "PC - Máy tính bộ",
    image: <IconPhone />,
  },
  {
    title: "PC - Màn hình máy tính",
    image: <IconPhone />,
  },
  {
    title: "PC - Linh kiện máy tính",
    image: <IconPhone />,
  },
  {
    title: "PC - Phụ kiên",
    image: <IconPhone />,
  },
  {
    title: "Máy tính bảng",
    image: <IconPhone />,
  },
  {
    title: "Thiết bị âm thanh",
    image: <IconPhone />,
  },
  {
    title: "Thiết bị văn phòng",
    image: <IconPhone />,
  },
];

function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className="category-banner">
      <div className="category-left">
        {categories.map((itemMain, index) => {
          return (
            <div className="category-item" key={"item-main-" + index}>
              <div className="category-info">
                {/* <img src={itemMain.image}  /> */}
                {/* <itemMain.image /> */}
                <div className="category-image">{itemMain.image}</div>
                <span className="category-title line-clamp-two">
                  {itemMain.title}
                </span>
              </div>
              <IconArrowRightSolid className="icon-arrow-right" />
              {itemMain?.list?.length > 0 && (
                <div className="category-content">
                  {itemMain.list?.map((itemSub, index) => {
                    return (
                      <div
                        className="item-category-sub"
                        key={"item-sub-" + index}
                      >
                        <p className="item-category-sub-title">
                          {itemSub.title}
                        </p>
                        {itemSub.listSub?.map((item, index) => {
                          return (
                            <div key={"item-" + index}>
                              <p>{item.title}</p>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="category-mid">
        <div>
          <Slider {...settings}>
            <div className="slide-banner-image">
              <img
                src="https://gw.alicdn.com/imgextra/i3/O1CN01v7txa61UEAzp2ymSu_!!6000000002485-0-tps-990-400.jpg"
                alt=""
              />
            </div>
            <div className="slide-banner-image">
              <img
                src="https://gw.alicdn.com/imgextra/i4/O1CN01fgKDTc21sN4WGK5AL_!!6000000007040-0-tps-990-400.jpg"
                alt=""
              />
            </div>
            <div className="slide-banner-image">
              <img
                src="https://s.alicdn.com/@img/imgextra/i3/O1CN01LG6THS1gLIXjvzP25_!!6000000004125-0-tps-990-400.jpg"
                alt=""
              />
            </div>
          </Slider>
        </div>
      </div>
      <div className="category-right">
        <img
          src="https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/RightBanner-fold3-12.png"
          alt=""
        />
        <img
          src="https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/right-ip14-th12.png"
          alt=""
        />
        <img
          src="https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/YOGA%206.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default Banner;
