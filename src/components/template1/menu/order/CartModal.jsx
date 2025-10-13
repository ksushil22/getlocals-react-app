import React, {useEffect, useState} from "react";
import ModalPopup from "../../../util/modals/ModalPopup";
import CartList from "./CartComponents";

const CartModal = ({cart, showCart, setShowCart, businessId}) => {

    return (
        <ModalPopup
            visible={showCart}
            handleCancel={() => setShowCart(false)}
            closable={true}
            showCancel={false}
            showTitleIcon={false}>
            <CartList cart={cart} businessId={businessId} />
        </ModalPopup>);
}
export default CartModal;