import styled from "styled-components";
import {Button, Form, Input} from "antd";

export const CartListContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
    max-width: 700px;
    margin: auto;
`;

export const SectionCard = styled.div`
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    padding: 20px;
`;

export const CartItemCard = styled.div`
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    padding: 8px 16px;
`;

export const TotalItemsCard = styled.div`
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    padding: 8px 16px;
    text-align: end !important;
`;

export const ItemInfo = styled.div`
    display: flex;
    gap: 12px;
    text-align: start !important;
`;

export const ItemImage = styled.img`
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 6px;
`;

export const Quantity = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: #888;
`;

export const NoMarginP = styled.p`
    margin: 0;
`;

export const OrderButton = styled(Button)`
    color: white;
    background: green;
    border: 1px solid green;
    width: 100%;
    height: 45px;
    border-radius: 10px;
    font-weight: 500;
    font-size: 16px;

    &:hover {
        color: white !important;
        background: darkgreen !important;
        border-color: darkgreen !important;
    }
`;

export const StyledForm = styled(Form)`
    width: 100%;
`;

export const StyledInput = styled(Input)`
    width: 100% !important;
    color: black !important;
    border: none !important;
    border-radius: 0 !important;
    border-bottom: 1px solid #a1a1a1 !important;
    font-size: 13px !important;

    &::placeholder {
        font-size: 13px !important;
    }

    &:focus {
        border: none !important;
        border-bottom: 1px solid #a1a1a1 !important;
        box-shadow: none !important;
    }
`;

export const StyledFormItem = styled(Form.Item)`
    margin-bottom: 10px;
    /* Apply red border to input when validation fails */
    &.ant-form-item-has-error .ant-input {
        border-bottom: 1px solid #ff4d4f !important;
    }
    /* Remove the error message visual space */
    .ant-form-item-explain {
        display: none;
    }
`;

