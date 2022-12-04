import { Button, Col, Modal, Progress, Rate, Row, Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import FormInput from "../../layouts/FormInput";

import {
  getEvaluateByIdProductAction,
  postEvaluateAction,
} from "../../store/evaluate/evaluates.action";
import { openNotificationWithIcon, validateInput } from "../../utils";

const { TextArea } = Input;

const getQueryParams = (query) =>
  window.location.search
    .replace("?", "")
    .split("&")
    .map((e) => e.split("=").map(decodeURIComponent))
    // eslint-disable-next-line no-sequences
    .reduce((r, [k, v]) => ((r[k] = v), r), {});

function Evaluate() {
  const location = useLocation();
  const paramFromUrl = getQueryParams(location.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productsSlice = useSelector(
    (state) => state.productsSlice.detailProduct
  );
  const evaluateSlice = useSelector(
    (state) => state.evaluateSlice.listEvaluate
  );

  console.log("evaluateSlice: ", evaluateSlice);

  const authSlice = useSelector((state) => state.authSlice);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idProduct, setIdProduct] = useState(paramFromUrl.id);
  const [loading, setLoading] = useState(false);
  const [sum, setSum] = useState({
    counts: {},
    sumComment: 0,
    avgComment: 0,
  });
  const [valueForm, setValueForm] = useState({
    title: "",
    content: "",
    numberStars: 0,
  });

  const [errorForm, setErrorForm] = useState({
    title: "",
    content: "",
    numberStars: 0,
  });

  useEffect(() => {
    dispatch(getEvaluateByIdProductAction({ idProduct }));
  }, [dispatch, idProduct]);

  useEffect(() => {
    setIdProduct(paramFromUrl.id);
  }, [paramFromUrl]);

  useEffect(() => {
    var counts = {};

    for (var i = 0; i < evaluateSlice?.data?.length; i++) {
      var num = evaluateSlice?.data[i];
      counts[num?.stars] = counts[num?.stars] ? counts[num?.stars] + 1 : 1;
    }

    setSum({
      counts: counts,
      sumComment:
        parseInt(counts[5] !== undefined ? counts[5] : 0) +
        parseInt(counts[4] !== undefined ? counts[4] : 0) +
        parseInt(counts[3] !== undefined ? counts[3] : 0) +
        parseInt(counts[2] !== undefined ? counts[2] : 0) +
        parseInt(counts[1] !== undefined ? counts[1] : 0),
      avgComment:
        parseInt(counts[5] !== undefined ? counts[5] : 0) * 5 +
        parseInt(counts[4] !== undefined ? counts[4] : 0) * 4 +
        parseInt(counts[3] !== undefined ? counts[3] : 0) * 3 +
        parseInt(counts[2] !== undefined ? counts[2] : 0) * 2 +
        parseInt(counts[1] !== undefined ? counts[1] : 0),
    });
  }, [productsSlice, evaluateSlice?.data]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleChange = (e) => {
    if (typeof e === "number") {
      setValueForm({
        ...valueForm,
        numberStars: e,
      });
    } else {
      const { name, value } = e?.target;
      setValueForm({
        ...valueForm,
        [name]: value,
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getFirstWord = (str) => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase();
    }
    return splitStr.join("");
  };

  const handleOk = async () => {
    let isValid = true;
    const newError = {
      title: "",
      content: "",
      numberStars: 0,
    };
    const infoFieldTitle = validateInput(valueForm.title, "tiêu đề", 0, "");
    const infoFieldContent = validateInput(
      valueForm.content,
      "nội dung",
      0,
      ""
    );
    if (valueForm.numberStars === 0) {
      isValid = false;
      newError.numberStars = "Vui lòng chọn số sao để đánh giá";
    } else {
      newError.numberStars = "";
    }
    if (!infoFieldTitle.isValid) {
      isValid = infoFieldTitle.isValid;
      newError.title = infoFieldTitle.message;
    }
    if (!infoFieldContent.isValid) {
      isValid = infoFieldContent.isValid;
      newError.content = infoFieldContent.message;
    }
    if (isValid) {
      const { title, content, numberStars } = valueForm;
      await setLoading(true);
      const res = await dispatch(
        postEvaluateAction({
          idCustomer: authSlice.infoAccount.idUser,
          idProduct: parseInt(idProduct),
          title: title,
          content: content,
          stars: numberStars,
        })
      );
      if (res?.payload?.status === "200") {
        openNotificationWithIcon("success", "Đánh giá thành công");
        dispatch(getEvaluateByIdProductAction({ idProduct }));
        setIsModalVisible(false);
      } else {
        openNotificationWithIcon("error", "Đánh giá thất bại");
      }
      await setLoading(false);
    }
    setErrorForm({ ...newError });
  };

  return (
    <Spin spinning={evaluateSlice.load}>
      <Row gutter={[16, 16]}>
        <Col md={8} xs={12} span={8}>
          <div style={{ textAlign: "center" }}>
            <p>Đánh Giá Trung Bình</p>
            <h1 style={{ fontSize: "32px" }}>5/5</h1>
            <Rate disabled allowHalf defaultValue={5} />
          </div>
        </Col>
        <Col md={8} xs={12} span={8}>
          {/* counts[5] === undefined ? counts[5] ? 0 , counts[4], counts[3], counts[2], counts[1] */}
          <div style={{ textAlign: "center" }}>
            <div className="row-star">
              <span className="number-comment">5</span>
              <i
                className="fas fa-star"
                style={{ marginRight: "8px", color: "#fadb14" }}
              ></i>
              <Progress
                percent={
                  sum.counts[5] !== undefined
                    ? (sum.counts[5] / sum.sumComment) * 100
                    : 0
                }
                showInfo={false}
              />
              <span className="number-comment">
                {sum.counts[5] !== undefined ? sum.counts[5] : 0}
              </span>
            </div>
            <div className="row-star">
              <span className="number-comment">4</span>
              <i
                className="fas fa-star"
                style={{ marginRight: "8px", color: "#fadb14" }}
              ></i>
              <Progress
                percent={
                  sum.counts[4] !== undefined
                    ? (sum.counts[4] / sum.sumComment) * 100
                    : 0
                }
                showInfo={false}
              />
              <span className="number-comment">
                {sum.counts[4] !== undefined ? sum.counts[4] : 0}
              </span>
            </div>
            <div className="row-star">
              <span className="number-comment">3</span>
              <i
                className="fas fa-star"
                style={{ marginRight: "8px", color: "#fadb14" }}
              ></i>
              <Progress
                percent={
                  sum.counts[3] !== undefined
                    ? (sum.counts[3] / sum.sumComment) * 100
                    : 0
                }
                showInfo={false}
              />
              <span className="number-comment">
                {sum.counts[3] !== undefined ? sum.counts[3] : 0}
              </span>
            </div>
            <div className="row-star">
              <span className="number-comment">2</span>
              <i
                className="fas fa-star"
                style={{ marginRight: "8px", color: "#fadb14" }}
              ></i>
              <Progress
                percent={
                  sum.counts[2] !== undefined
                    ? (sum.counts[2] / sum.sumComment) * 100
                    : 0
                }
                showInfo={false}
              />
              <span className="number-comment">
                {sum.counts[2] !== undefined ? sum.counts[2] : 0}
              </span>
            </div>
            <div className="row-star">
              <span className="number-comment">1</span>
              <i
                className="fas fa-star"
                style={{ marginRight: "8px", color: "#fadb14" }}
              ></i>
              <Progress
                percent={
                  sum.counts[1] !== undefined
                    ? (sum.counts[1] / sum.sumComment) * 100
                    : 0
                }
                showInfo={false}
              />
              <span className="number-comment">
                {sum.counts[1] !== undefined ? sum.counts[1] : 0}
              </span>
            </div>
          </div>
        </Col>
        <Col md={8} xs={24} span={8}>
          <div style={{ textAlign: "center" }}>
            <p className="small-para">Bạn đã dùng sản phẩm này?</p>
            <Button type="primary" onClick={showModal}>
              Đánh giá
            </Button>
          </div>
        </Col>
      </Row>
      <div className="wrap-render-list-comment">
        {evaluateSlice?.data?.map((item, index) => (
          <div className="comment" key={"item-comment-" + index}>
            <div className="comment-avatar">{getFirstWord(item.name)}</div>
            <div className="comment-content">
              <div className="comment-name">{item.name}</div>
              <div className="comment-star">
                <Rate disabled defaultValue={item.stars} allowHalf />
                <span className="comment-time">
                  {new Date(item.currentComment).toLocaleString()}
                </span>
              </div>
              <div className="comment-text">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        title="Nhận xét sản phẩm"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Đánh giá
          </Button>,
        ]}
      >
        {authSlice?.infoAccount?.accessToken ? (
          <>
            <div className="evaluate-star">
              <span>Chọn đánh giá của bạn </span>
              <Rate
                defaultValue={0}
                value={valueForm.numberStars}
                onChange={handleChange}
                name="stars"
              />
              {errorForm.numberStars?.length > 0 && (
                <div>
                  <small className="form-error">{errorForm.numberStars}</small>
                </div>
              )}
            </div>
            <FormInput
              title="Tiêu đề"
              htmlFor="title"
              type=""
              placeholder="Hài lòng, giá tốt, chất lượng như mô tả, ..."
              name="title"
              value={valueForm.title}
              onChange={handleChange}
              onKeyDown=""
              className=""
              error={errorForm.title}
            />
            <FormInput
              title="Đánh giá chi tiết"
              htmlFor="detailEvaluate"
              content={
                <TextArea
                  rows={4}
                  placeholder="Mọi sản phẩm đều có ưu / nhược riêng. Chia sẻ chi tiết cho mọi người về sản phẩm nhé"
                  onChange={handleChange}
                  name="content"
                  value={valueForm.content}
                />
              }
              error={errorForm.content}
            />
          </>
        ) : (
          <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
        )}
      </Modal>
    </Spin>
  );
}

export default Evaluate;
