import { Fragment, useMemo } from "react";
import classes from "./ProductDescription.module.css";

const NutritionDetails = (props) => {
  const getNutritionDetails = useMemo(() => {
    const pdtName =
      props?.nutritionDetails?.contents[0]?.nutritiondetails?.productname || "";
    const nutrientsList =
      props?.nutritionDetails?.contents[0]?.nutritiondetails?.itemswithvalue ||
      [];
    return {
      pdtName,
      nutrientsList,
    };
  }, [props]);

  return (
    <Fragment>
      <div>
        <div className={classes["nutrition-info-modal-header"]}>
          <h2 className={classes["product-name"]}>
            {getNutritionDetails?.pdtName}
          </h2>
          <h4 className={classes["product-weight"]}>NUTRITION INFO</h4>
        </div>
        <div className={classes["nutrition-info-modal-container"]}>
          {getNutritionDetails?.nutrientsList?.length > 0
            ? getNutritionDetails?.nutrientsList?.map((item, index) => (
                <NutrientDataListItem
                  key={index}
                  nutrientTitle={item?.item}
                  nutrientValue={item?.value}
                />
              ))
            : null}
        </div>
      </div>
    </Fragment>
  );
};

const NutrientDataListItem = (props) => {
  return (
    <div className={classes["nutrition-list"]}>
      <span>{props?.nutrientTitle}</span>
      <span>{props?.nutrientValue}</span>
    </div>
  );
};

export default NutritionDetails;
