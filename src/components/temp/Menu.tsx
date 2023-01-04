import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../components/menu/Categories";
import MenuHeading from "../components/menu/MenuHeading";
import MenuList from "../components/menu/MenuList";
import Search from "../components/menu/Search";
import { useLocation } from "react-router-dom";
import { fetchCartData } from "../store/catalog-actions";
import SearchMenuList from "../components/menu/SearchMenuList";
import { RootState } from "../store";
import ProductDetailModal from "../components/productDetail/ProductDetailModal";
import Wrapper from "../components/helpers/Wrapper";
import { productDetailActions } from "../store/product-details-slice";
import { cartActions } from "../store/cart-slice";
import Logo from "../components/UI/Logo";
import Cart from "../components/cart/Cart";
import classes from "./Menu.module.css";
import { buttercmsData } from "../store/buttercms.actions";
import FinalSubmit from "../components/cart/FinalSubmit";
import NutritionInfoModal from "../components/productDetail/NutritionInfoModal";

const Menu = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const basketId = queryParams.get("basket");
  const cafe = queryParams.get("cafe");
  const dispatch = useDispatch();
  const [addedProduct, setAddedProduct]: any = useState("");
  const mainCategories = useSelector(
    (state: RootState) => state.catelog.mainCategories
  );
  const errorMessage = useSelector(
    (state: RootState) => state.catelog.errorMessage
  );

  const catelog = useSelector((state: RootState) => state.catelog.catelog);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedProduct, setSelectedProduct]: any = useState("");
  const [finalSubmit, setFinalSubmit] = useState(false);
  const productsInCart = useSelector(
    (state: RootState) => state.cart.productsInCart
  );
  const content: any = useSelector(
    (state: RootState) => state.buttercms.content
  );

  const [isAddCartModalVisible, setAddCartModalVisible] = useState(false);
  const [isNutritionModalVisible, setNutritionModalVisible] = useState(false);

  const onCloseAddCartPopup = () => {
    setAddCartModalVisible(false);
  };

  const onShowNutritionPopup = () => {
    setAddCartModalVisible(false);
    setNutritionModalVisible(true);
  };

  const onCloseNutritionPopup = () => {
    setNutritionModalVisible(false);
    setAddCartModalVisible(true);
  };

  useEffect(() => {
    const localBasketId = localStorage.getItem("basketId");
    if (localBasketId != basketId) {
      localStorage.setItem("basketId", basketId);
      localStorage.setItem("productsInCart", JSON.stringify([]));
      localStorage.setItem("name", "");

      dispatch(
        cartActions.getProducts({
          productsInCart: [],
          errorMessage: "",
        })
      );
    } else {
      const products = JSON.parse(localStorage.getItem("productsInCart"));
      dispatch(
        cartActions.getProducts({
          productsInCart: products,
          errorMessage: "",
        })
      );
    }
  }, []);

  useEffect(() => {
    dispatch(fetchCartData(cafe));
  }, [cafe, dispatch]);

  useEffect(() => {
    dispatch(buttercmsData());
  }, [dispatch]);

  useEffect(() => {
    if (!searchText && !selectedCategory && mainCategories.length) {
      setSelectedCategory(mainCategories[0]);
    }
  }, [selectedCategory, mainCategories, searchText]);

  const mainCategoryChangeHandler = (param) => (event) => {
    setSelectedCategory((prevState) => {
      return param;
    });
    if (searchText) {
      setSearchText("");
    }
  };
  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
    if (selectedCategory) {
      setSelectedCategory("");
    }
  };
  const productSelectionChangeHandler = (param) => (event) => {
    setAddCartModalVisible(true);
    setSelectedProduct((prevState) => {
      setAddedProduct("");
      return param;
    });
  };
  const onModalCloseHandler = (event) => {
    setSelectedProduct(null);
    dispatch(
      productDetailActions.getAllOptions({
        optionGroups: [],
      })
    );
    dispatch(cartActions.resetCost({ cost: 0 }));
    dispatch(cartActions.resetMinSelectErrors({ minSelectErrors: 0 }));
    dispatch(cartActions.resetModifiers({}));
    dispatch(
      cartActions.showError({
        errorMessage: "",
      })
    );
  };
  const finalSubmitHandler = (event) => {
    setFinalSubmit((prevState) => {
      return true;
    });
  };
  useEffect(() => {
    if (productsInCart && productsInCart.length) {
      if (selectedProduct) {
        setAddedProduct((prevState) => selectedProduct.id);
        onModalCloseHandler(null);
      }
    }
  }, [productsInCart]);

  const classesCol = `col-lg-8 col-md-8 ${classes["final-submit"]}`;
  return (
    <Wrapper>
      {errorMessage ? (
        <div className={classes["error-div"]}>
          <Logo image={content.logo} />
          <p className={classes["error-message"]}>{errorMessage}</p>
        </div>
      ) : (
        <Fragment>
          {mainCategories && mainCategories.length ? (
            <div className="row">
              <div className={!finalSubmit ? "col-lg-8 col-md-8" : classesCol}>
                {!finalSubmit ? (
                  <div>
                    <Logo image={content.logo} />
                    <MenuHeading />
                    {selectedProduct && isAddCartModalVisible ? (
                      <ProductDetailModal
                        onCloseAddCartModal={onCloseAddCartPopup}
                        onShowNutritionModal={onShowNutritionPopup}
                        product={selectedProduct}
                        onModalClose={onModalCloseHandler}
                      />
                    ) : null}
                    {isNutritionModalVisible ? (
                      <NutritionInfoModal
                        product={selectedProduct}
                        onCloseNutritionDetailsModal={onCloseNutritionPopup}
                        onModalClose={onModalCloseHandler}
                      />
                    ) : null}
                    <Search
                      onSearchChangeHandler={onSearchTextChangeHandler}
                      searchTextValue={searchText}
                    />
                    <Categories
                      mainCategories={mainCategories}
                      selectedCategory={selectedCategory}
                      onMainCategoryChangeHandler={mainCategoryChangeHandler}
                    />
                    {searchText ? (
                      <SearchMenuList
                        catelog={catelog}
                        searchText={searchText}
                        onProductSelect={productSelectionChangeHandler}
                        addedProduct={addedProduct}
                      />
                    ) : (
                      <MenuList
                        selectedCategory={selectedCategory}
                        catelog={catelog}
                        onProductSelect={productSelectionChangeHandler}
                        addedProduct={addedProduct}
                      />
                    )}
                  </div>
                ) : (
                  <FinalSubmit />
                )}
              </div>
              <div className="col-lg-4 col-md-4">
                <Cart finalSubmitHandler={finalSubmitHandler} />
              </div>
            </div>
          ) : null}
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Menu;
