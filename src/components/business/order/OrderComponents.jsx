import styled from "styled-components";
import {Button} from "antd";

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
  background-color: ${({ isconnected }) => (isconnected ? "#4caf50" : "#f44336")};
`;

export const ClearButton = styled.button`
  padding: 8px 16px;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #d32f2f;
  }
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

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
`;

export const OrderId = styled.span`
  font-weight: bold;
  color: #333;
`;

export const OrderTime = styled.span`
  font-size: 14px;
  color: #666;
`;

export const OrderDetails = styled.div`
  font-size: 14px;
  color: #555;

  pre {
    margin: 0;
    font-family: inherit;
  }
`;

export const OrderStatusButton = styled(Button)`
    background-color: ${({ isconnected }) => (isconnected ? "#f44336" : "#4caf50")};
    border-color: ${({ isconnected }) => (isconnected ? "#f44336" : "#4caf50")};
    color: #fff;
    transition: all 0.2s ease;

    // Normal hover only if not disabled
    &:not(:disabled):hover {
        background-color: ${({ isconnected }) => (isconnected ? "#d32f2f" : "#43a047")} !important;
        border-color: ${({ isconnected }) => (isconnected ? "#d32f2f" : "#43a047")} !important;
        color: #fff !important;
        cursor: pointer;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background-color: ${({ isconnected }) => (isconnected ? "#f44336" : "#4caf50")} !important;
        border-color: ${({ isconnected }) => (isconnected ? "#f44336" : "#4caf50")} !important;
        color: #fff !important;
    }
`;

