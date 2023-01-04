import { Fragment, useEffect } from "react";
import ProductDescription from "./ProductDescription";
import ProductImage from "./ProductImage";
import classes from "./ProductDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../../store/product-details-actions";
import { RootState } from "../../store";
import OptionGroups from "./OptionGroups";
import AddToCart from "./AddToCart";
import { addCartData } from "../../store/cart-actions";

const ProductDetails = (props) => {
  const productId = props.product.id;
  const dispatch = useDispatch();
  const optionGroups = useSelector(
    (state: RootState) => state.productDetail.optionGroups
  );

  const addToCartHandler = () => {
    dispatch(addCartData(productId, 1));
  };

  useEffect(() => {
    dispatch(fetchProductDetail(productId));
  }, [productId, dispatch]);

  return (
    <Fragment>
      <div>
        <ProductImage product={props.product} />
        <div className={classes["product-details"]}>
          <div
            className={classes["nutrition-info-btn"]}
            onClick={() => props?.onShowNutritionInfo()}
          >
            <div className={classes["nutrition-info-btn-text"]}>
              Nutrition Info
            </div>
          </div>
          <AddToCart
            addToCart={addToCartHandler}
            productId={props.product.id}
          />
          <ProductDescription product={props.product} />
          {optionGroups && optionGroups.length ? (
            <OptionGroups optionGroups={optionGroups} />
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
