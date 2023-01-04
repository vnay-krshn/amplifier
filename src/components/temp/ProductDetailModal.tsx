import React from "react";
import ReactDOM from "react-dom";
import Card from "../UI/Card";
import classes from "./ProductDetailModal.module.css";

import ProductDetails from "./ProductDetails";
import CloseButton from "react-bootstrap/CloseButton";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

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
      <CloseButton
        className={classes["close-button"]}
        onClick={() => props?.onCloseAddCartDetailsModal()}
      />
      <ProductDetails
        product={props.product}
        onShowNutritionInfo={() => props?.onShowNutritionInfoModal()}
      />
    </Card>
  );
};

const ProductDetailModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onCloseAddCartDetailsModal={() => props?.onCloseAddCartModal()}
          onShowNutritionInfoModal={() => props?.onShowNutritionModal()}
          product={props.product}
          onClose={props.onModalClose}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default ProductDetailModal;
