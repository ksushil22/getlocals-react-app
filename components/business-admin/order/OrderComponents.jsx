import styled, { keyframes } from "styled-components";
import {Button} from "antd";
import {useWebSocket} from "@/lib/context/WebSocketContext";
import {useEffect, useState} from "react";

// Animation keyframes
const slideIn = keyframes`
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const pulse = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
`;

const expandDown = keyframes`
    from {
        max-height: 0;
        opacity: 0;
    }
    to {
        max-height: 1000px;
        opacity: 1;
    }
`;

export const Container = styled.div`
  padding: 20px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid #e0e0e0;
    flex-wrap: wrap; 

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px; 
    }
`;


export const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #333;
`;

export const ConnectionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

export const StatusIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ isconnected }) => (isconnected ? "#52c41a" : "#ff7875")};
  transition: all 0.3s ease;
  animation: ${({ isconnected }) => (isconnected ? pulse : 'none')} 2s ease-in-out infinite;
`;

export const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #999;

  p {
    font-size: 14px;
  }
`;

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const OrderCard = styled.div`
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const OrderStatusButton = styled(Button)`
    background-color: ${({ isconnected }) => (isconnected ? "#ff7875" : "#52c41a")};
    border-color: ${({ isconnected }) => (isconnected ? "#ff7875" : "#52c41a")};
    color: #fff;
    transition: all 0.2s ease;

    // Normal hover only if not disabled
    &:not(:disabled):hover {
        background-color: ${({ isconnected }) => (isconnected ? "#ff4d4f" : "#73d13d")} !important;
        border-color: ${({ isconnected }) => (isconnected ? "#ff4d4f" : "#73d13d")} !important;
        color: #fff !important;
        cursor: pointer;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background-color: ${({ isconnected }) => (isconnected ? "#ff7875" : "#52c41a")} !important;
        border-color: ${({ isconnected }) => (isconnected ? "#ff7875" : "#52c41a")} !important;
        color: #fff !important;
    }
`;

// Split Screen Components
export const SplitContainer = styled.div`
    display: flex;
    height: calc(85vh - 140px);
    gap: 20px;
    overflow: auto;

    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
    }
`;

export const OrdersListPanel = styled.div`
    width: 350px;
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 0;
    overflow: hidden;
    border: 1px solid #e0e0e0;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        width: 100%;
        height: 400px;
    }
`;

export const OrderDetailPanel = styled.div`
    flex: 1;
    background-color: #fff;
    border-radius: 8px;
    padding: 0;
    overflow-y: auto;
    border: 1px solid #e0e0e0;
    animation: ${fadeIn} 0.3s ease-out;

    @media (max-width: 768px) {
        height: auto;
    }
`;

export const OrderListHeader = styled.div`
    padding: 20px;
    background-color: #fff;
    border-bottom: 2px solid #e0e0e0;
    font-weight: 600;
    font-size: 16px;
    position: sticky;
    top: 0;
    z-index: 10;
`;

export const OrderListItem = styled.div`
    padding: 16px 20px;
    background-color: ${({ isSelected }) => (isSelected ? "#e6f4ff" : "#fff")};
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: ${slideIn} 0.3s ease-out;
    transform-origin: left center;

    &:hover {
        background-color: ${({ isSelected }) => (isSelected ? "#e6f4ff" : "#f5f5f5")};
        transform: translateX(5px);
    }

    ${({ status }) => status === 'PREPARING' && `
        border-left: 4px solid #52c41a;
    `}

    ${({ status }) => status === 'READY' && `
        border-left: 4px solid green;
    `}

    ${({ status }) => status === 'DECLINED' && `
        border-left: 4px solid #ff7875;
    `}

    ${({ status }) => status === 'PENDING' && `
        border-left: 4px solid #faad14;
    `}

    ${({ status }) => status === 'COMPLETED' && `
        border-left: 4px solid green;
    `}
`;

export const OrderCustomerName = styled.div`
    font-weight: 600;
    font-size: 16px;
    color: #333;
    margin-bottom: 4px;
`;

export const OrderItemCount = styled.div`
    font-size: 14px;
    color: #666;
`;

export const OrderDetailHeader = styled.div`
    padding: 20px;
    background-color: #f8f9fa;
    border-bottom: 2px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 10;

    span {
        font-size: 14px;
        color: #666;
    }
`;

export const OrderDetailContent = styled.div`
    padding: 20px;
    animation: ${fadeIn} 0.4s ease-out;
`;

export const OrderIdBadge = styled.div`
    background-color: var(--primary-color);
    color: #fff;
    padding: 6px 12px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 14px;
`;

export const CustomerInfo = styled.div`
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;

    h3 {
        margin-top: 0;
        margin-bottom: 16px;
        color: #333;
        font-size: 18px;
    }

    p {
        margin: 8px 0;
        color: #555;
        font-size: 14px;
    }

    strong {
        color: #333;
        margin-right: 8px;
    }
`;

export const ItemsList = styled.div`
    margin-bottom: 10px;

    h3 {
        margin-bottom: 16px;
        color: #333;
        font-size: 18px;
    }
`;

export const ItemRow = styled.div`
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 4px;
    margin-bottom: 8px;
`;

export const ItemQuantity = styled.span`
    background-color: var(--primary-color);
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 14px;
    margin-right: 12px;
    min-width: 35px;
    text-align: center;
`;

export const ItemName = styled.span`
    color: #333;
    font-size: 16px;
`;

export const AdditionalInstructions = styled.div`
    background-color: #f4f4f4;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 10px;
    margin-top: 10px;

    h3 {
        margin-top: 0;
        margin-bottom: 12px;
        font-size: 18px;
    }

    p {
        margin: 0;
        color: #555;
        font-size: 14px;
        line-height: 1.5;
    }
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 24px;
    animation: ${slideIn} 0.4s ease-out 0.2s both;
`;

export const AcceptButton = styled(Button)`
    flex: 1;
    padding: 12px 24px;
    background: #52c41a !important;
    border: 1px solid #52c41a !important;
    color: #fff;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(0);

    &:hover {
        background-color: #73d13d !important;
        border-color: #73d13d !important;
        color: #fff !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(82, 196, 26, 0.3);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const RejectButton = styled(Button)`
    flex: 1;
    padding: 12px 24px;
    background-color: #6c757d;
    color: #fff;
    border: 1px solid #6c757d !important;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(0);

    &:hover {
        background-color: #5a6268 !important;
        border-color: #5a6268 !important;
        color: #fff !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const EmptyDetailState = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #999;
    font-size: 16px;
`;

export const EmptyListState = styled.div`
    text-align: center;
    padding: 40px 20px;
    color: #999;

    p {
        margin: 8px 0;
        font-size: 14px;
    }
`;

export const OrderStatusBadge = styled.div`
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    transition: all 0.3s ease;
    animation: ${fadeIn} 0.4s ease-out;
    
    ${({ status }) => status === 'PREPARING' && `
        background-color: #f6ffed;
        color: #52c41a;
        border: 1px solid #b7eb8f;
    `}

    ${({ status }) => status === 'READY' && `
        background-color: #f6ffed;
        color: green;
        border: 1px solid green;
    `}

    ${({ status }) => status === 'DECLINED' && `
        background-color: #fff2f0;
        color: #ff7875;
        border: 1px solid #ffccc7;
    `}

    ${({ status }) => status === 'PENDING' && `
        background-color: #fffbe6;
        color: #faad14;
        border: 1px solid #ffe58f;
    `}

    ${({ status }) => status === 'COMPLETED' && `
        background-color: #f6ffed;
        color: green;
        border: 1px solid green;
    `}
`;


export const ActiveOrdersContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 200px;
`;

export const HistoricalOrdersWrapper = styled.div`
    border-top: 2px solid #e0e0e0;
    background-color: #fff;
    margin-top: auto;
`;

export const HistoricalOrdersContainer = styled.div`
    overflow: hidden;
    transition: max-height 0.4s ease-in-out, opacity 0.3s ease-in-out;
    max-height: ${({ isOpen }) => (isOpen ? '400px' : '0')};
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    overflow-y: ${({ isOpen }) => (isOpen ? 'auto' : 'hidden')};
`;
