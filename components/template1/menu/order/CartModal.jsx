import React, {useEffect, useState} from "react";
import ModalPopup from "../../../util/modals/ModalPopup";
import CartList from "./Cart";

const CartModal = ({cart, showCart, setShowCart, businessId}) => {

    return (
        <ModalPopup
            visible={showCart}
            handleCancel={() => setShowCart(false)}
            closable={true}
            showCancel={false}
            showTitleIcon={false}
            disableScreenTouch={false}
            style={{
                maxHeight: "80vh",
                overflowY: "auto",
                overflowX: "hidden",
                objectFit: "contain",
                margin: "auto",
            }}>
            <CartList cart={cart} businessId={businessId} />
        </ModalPopup>);
}
export default CartModal;