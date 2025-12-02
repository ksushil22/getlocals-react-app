import React, { useEffect } from 'react';
import GetLoader, { DISPLAY, SPINNERS } from "../components/util/customSpinner/GetLoader";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { useGetTemplateInformationQuery } from "../redux/services/businessAPI";
import { useDispatch } from "react-redux";
import {setCurrentTemplateBusiness} from "../redux/slicers/templateBusinessSlicer";

const BusinessNavigator = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { businessUsername } = useParams();
    const { data: templateInformation, error, isLoading } = useGetTemplateInformationQuery({ businessUsername });


    useEffect(() => {
        if (!isLoading) {
            if (error) {
                // Handle the error, e.g., navigate to an error page or show a message
                navigate('/error');
            } else if (templateInformation) {
                dispatch(setCurrentTemplateBusiness({ id: templateInformation?.id }));
                if (location.hash) {
                    navigate(`/${templateInformation.templateId}/home/`, { state: { scrollTo: location.hash.slice(1) } });
                } else {
                    navigate(`/${templateInformation.templateId}/home/`);
                }
            }
        }
    }, [isLoading, templateInformation, error, dispatch, navigate]);

    if (isLoading) {
        return <GetLoader display={DISPLAY.FULLSCREEN} spinner={SPINNERS.ROTATING_DOT_SPINNER} />;
    }

    return null;
}

export default BusinessNavigator;
