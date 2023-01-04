import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { API } from "tsc-core";
import CloseButton from "react-bootstrap/CloseButton";
import { useSelector } from "react-redux";

import Card from "../UI/Card";
import { RootState } from "../../store";
import NutritionDetails from "./NutritionDetails";
import classes from "./ProductDetailModal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  const loader: any = useSelector((state: RootState) => state.loader.loader);

  return (
    <Card className={classes.modal}>
      <div id="backdrop-modal"></div>
      <div
        id="overlay-modal"
        className={`${classes["overlay-modal"]} ${
          loader && loader.loaderVisible && classes["show-loader"]
        }`}
      ></div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <CloseButton
          className={classes["close-button"]}
          onClick={() => props?.onCloseNutritionInfoModal()}
        />
        <div className={classes["nutritionInfoContainer"]}>
          {Object.keys(props?.nutritionInfo)?.length > 0 ? (
            <NutritionDetails nutritionDetails={props?.nutritionInfo} />
          ) : null}
        </div>
      </div>
    </Card>
  );
};

const NutritionInfoModal = (props) => {
  const [nutritionInfoList, setNutritionInfoList] = useState({});

  useEffect(() => {
    fetchNutritionData();
  }, []);

  const fetchNutritionData = async () => {
    let data = {};

    const response = await API.CMS.getPage(
      props.product.chainproductid + "?rawdatarequired=true"
    );

    if (response) {
      data = await response;
      setNutritionInfoList(data);
    }

    return data;
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {Object.keys(nutritionInfoList)?.length > 0
        ? ReactDOM.createPortal(
            <ModalOverlay
              onCloseNutritionInfoModal={() =>
                props?.onCloseNutritionDetailsModal()
              }
              product={props.product}
              onClose={props.onModalClose}
              nutritionInfo={nutritionInfoList}
            />,
            document.getElementById("overlay-root")
          )
        : null}
    </React.Fragment>
  );
};

export default NutritionInfoModal;
