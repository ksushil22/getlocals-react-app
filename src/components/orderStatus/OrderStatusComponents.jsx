import styled from "styled-components";

export const OrderStatusBody = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
`

export const Container = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    max-width: 550px;
    margin: auto;
`

export const Header = styled.div`
    text-align: center;
    padding-bottom: 20px;
    margin-bottom: 30px;
    
    ${({ status }) => status === 'PREPARING' && `
        border-bottom: 2px solid #9C27B0;
    `}

    ${({ status }) => status === 'READY' && `
        border-bottom: 2px solid #green;
    `}

    ${({ status }) => status === 'DECLINED' && `
        border-bottom: 2px solid #ff7875;
    `}

    ${({ status }) => status === 'PENDING' && `
        border-bottom: 2px solid #faad14;
    `}

    ${({ status }) => status === 'COMPLETED' && `
        border-bottom: 2px solid green;
    `}
`
export const StatusBadge = styled.div`
    color: white;
    padding: 10px 20px;
    border-radius: 25px;
    display: inline-block;
    font-weight: bold;
    margin: 20px 0;
    
    ${({ status }) => status === 'PREPARING' && `
        background-color: #9C27B0;
    `}

    ${({ status }) => status === 'READY' && `
        background-color: green;
    `}

    ${({ status }) => status === 'DECLINED' && `
        background-color: #ff7875;
    `}

    ${({ status }) => status === 'PENDING' && `
        background-color: #faad14;
    `}

    ${({ status }) => status === 'COMPLETED' && `
        background-color: green;
    `}
`

export const OrderDetails = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    margin: 20px 0;
`

export const OrderItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    
    &:last-child {
        border-bottom: none;
        font-weight: bold;
        font-size: 1.1em;
    }
`
export const Footer = styled.div`
    text-align: center;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    color: #666;
    font-size: 0.9em;
`
export const ThankYouContainer = styled.div`
    background-color: #f6ffed;
    color: green;
    border-left: 4px solid green;
    padding: 15px;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 20px;
`