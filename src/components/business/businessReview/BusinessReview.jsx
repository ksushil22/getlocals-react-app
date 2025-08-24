import React from 'react'
import BusinessHeading from "../../util/BusinessHeading";
import {useGetBusinessReviewsQuery} from "../../../redux/services/businessAPI";
import {useSelector} from "react-redux";
import GetLoader, {DISPLAY, SPINNERS} from "../../util/customSpinner/GetLoader";
import {Image, List, Row, Space} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone, faReply} from "@fortawesome/free-solid-svg-icons";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {PUBLIC_BUSINESS_API} from "../../../redux/api_url";
import "./businessReview.css"
import GetRating from "../../util/GetRating";
import NoDataGIF from "../../util/NoDataGIF";

const BASE_URL = process.env.BASE_API_URL;

const BusinessReview = () => {
    const businessId = useSelector((state) => state.business.businessId);

    const {
        data: reviews,
        isLoading: loadingReviews
    } = useGetBusinessReviewsQuery({businessId: businessId})
    if (loadingReviews) {
        return <GetLoader spinner={SPINNERS.SKELETON_LIST} display={DISPLAY.AREA}/>
    }

    return (

        <Row>
            <BusinessHeading heading={"Reviews"}/>
            <List
                itemLayout="vertical"
                style={{
                    width: '100%',
                    marginTop: 50
                }}
                size="large"
                dataSource={reviews}
                renderItem={(review) => (
                    <ReviewCards
                        item={review}
                        businessId={businessId}
                    />)}
                locale={{
                    emptyText: <NoDataGIF message={"No Review available."} />
                }}
            />
        </Row>

    )

}
const ReviewCards = ({item, businessId}) => {
    const screens = useBreakpoint();
    const cardMargin = screens.md || screens.lg || screens.xl || screens.xxl ? 50 : 12;

    return <List.Item
        className={"item-card"}
        style={{
            marginRight: cardMargin,
            marginLeft: cardMargin
        }}
        colStyle={{
            border: '1px solid red'
        }}
        actions={[
            item?.email && (
                <Space
                    key="email"
                    style={{ cursor: 'pointer' }}
                    title={item.email}
                    onClick={() => {
                        window.location.href = `mailto:${item.email}`;
                    }}
                >
                    <FontAwesomeIcon icon={faReply} /> {screens.lg || screens.xl || screens.xxl ? item.email : "Reply"}
                </Space>
            ),
            item?.phone && (
                <Space
                    key="phone"
                    title={item.phone}
                    style={{ cursor: item.phone ? 'pointer' : 'not-allowed' }}
                    onClick={() => {
                        if (item.phone) {
                            window.location.href = `tel:${item.phone}`;
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faPhone} /> {screens.lg || screens.xl || screens.xxl ? item.phone : "Call"}
                </Space>
            ),
            <Space key="date">
                {item.date}
            </Space>,
        ].filter(Boolean)}
        extra={
            item.imageId ?
            <Image
                alt={item.fullName}
                src={`${BASE_URL}${PUBLIC_BUSINESS_API}${businessId}/image/${item.imageId}`}
                style={{
                    width: 150,
                    height: 150,
                    objectFit: 'contain',
                    borderRadius: 5
                }}
                loading={"lazy"}
            /> : null}
        key={item.id}
    >
        <List.Item.Meta
            title={item.fullName}
            description={
                <GetRating readOnly={true} initialRating={item.rating} onSelect={() => {}}/>}
        />
        <p>{item.comment}</p>
    </List.Item>
}

export default BusinessReview;
