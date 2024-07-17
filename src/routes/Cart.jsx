import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CartBox from "../ui/cart/CartBox";
import useCartList from "../features/cart/useCartList";
import emptyCart from "../Assets/images/emptyCart.svg";
import { useDispatch, useSelector } from "react-redux";
import { updateEntireCart } from "../redux/slices/cart";
import { deleteCart } from "../services/apiCart";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import DataLoader from "../ui/DataLoader";
import SubmitButton from "./../ui/form-elements/SubmitButton";
import ConfirmationModal from "../ui/modals/ConfirmationModal";
import OrderModal from "./../ui/modals/OrderModal";

const Cart = () => {
  const { data: cartQuery, isLoading } = useCartList();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [cartObjList, setCartObjList] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showConfirmPayModel, setShowConfirmPayModel] = useState(false);
  const user = useSelector((state) => state.authedUser.user);

  useEffect(() => {
    if (cartQuery?.data?.length > 0) {
      const newCartObjList = cartQuery.data.map((item) => ({
        service_id: item?.service?.id,
        quantity: item?.quantity,
        developments: item?.service?.developments
          ?.filter((dev) => dev.in_cart !== false)
          .map((dev) => dev.id)
      }));
      setCartObjList(newCartObjList);
      setTotalCartPrice(
        cartQuery?.data?.reduce((acc, item) => {
          return acc + item?.total;
        }, 0)
      );
    }
  }, [cartQuery]);

  useEffect(() => {
    function handleCartChange() {
      dispatch(
        updateEntireCart(
          cartQuery?.data?.map((item) => ({
            id: item.id,
            service_id: item.service?.id,
            quantity: item.quantity,
            developments: item?.service?.developments?.map(
              (dev) => dev.in_cart === false && dev.id
            )
          }))
        )
      );
    }

    window.addEventListener("load", handleCartChange);
    return () => window.removeEventListener("load", handleCartChange);
  }, [cartQuery, dispatch]);

  const queryClient = useQueryClient();
  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteCart(queryClient);
      toast.success(t("cart.cartDelted"));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return isLoading ? (
    <DataLoader />
  ) : (
    <section className="cart-section container">
      <div className="row">
        {cartQuery?.data && cartQuery?.data?.length > 0 ? (
          <div className="col-12 p-2">
            {cartQuery?.data?.map((item) => (
              <CartBox
                item={item}
                key={item.id}
                cartObjList={cartObjList}
                setTotalCartPrice={setTotalCartPrice}
                totalCartPrice={totalCartPrice}
              />
            ))}
            <div className="col-lg-5 col-12 p-2">
              <div className="cartTotalPrice">
                <p>{t("cart.totalCart")}:</p>
                <h6 className="mb-0">
                  {totalCartPrice}
                  <i className="fa-solid fa-dollar-sign"></i>
                </h6>
              </div>
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-6 col-12">
                  <button
                    className="order-now"
                    onClick={() => setShowConfirmPayModel(true)}
                  >
                    {t("services.orderNow")}
                  </button>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <SubmitButton
                    className="order-now delete"
                    name={t("cart.deleteCart")}
                    onClick={handleDelete}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-12 p-2">
            <div className="empty_cart">
              <img src={emptyCart} alt="empty-cart" />
              <h3>{t("cart.empty")}</h3>
              <Link to="/services">{t("cart.exploreServices")}</Link>
            </div>
          </div>
        )}
      </div>
      <OrderModal
        setShowModal={setShowConfirmPayModel}
        showModal={showConfirmPayModel}
        ballance={user?.wallet}
        cartTotalPrice={totalCartPrice}
      />
    </section>
  );
};

export default Cart;
