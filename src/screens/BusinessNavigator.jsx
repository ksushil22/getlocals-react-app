import React, { useEffect } from 'react';
import GetLoader, { DISPLAY, SPINNERS } from "../components/util/customSpinner/GetLoader";
import {useParams, useRouter, usePathname} from "next/navigation";
import { useGetTemplateInformationQuery } from "../redux/services/businessAPI";
import { useDispatch } from "react-redux";
import {setCurrentTemplateBusiness} from "../redux/slicers/templateBusinessSlicer";

const BusinessNavigator = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const businessUsername = params?.slug || params?.businessUsername;
    const { data: templateInformation, error, isLoading } = useGetTemplateInformationQuery({ businessUsername });


    useEffect(() => {
        if (!isLoading) {
            if (error) {
                // Handle the error, e.g., navigate to an error page or show a message
                router.push('/error');
            } else if (templateInformation) {
                dispatch(setCurrentTemplateBusiness({ id: templateInformation?.id }));
                const hash = typeof window !== 'undefined' ? window.location.hash : '';
                if (hash) {
                    router.push(`/${templateInformation.templateId}/home/?scrollTo=${hash.slice(1)}`);
                } else {
                    router.push(`/${templateInformation.templateId}/home/`);
                }
            }
        }
    }, [isLoading, templateInformation, error, dispatch, router]);

    if (isLoading) {
        return <GetLoader display={DISPLAY.FULLSCREEN} spinner={SPINNERS.ROTATING_DOT_SPINNER} />;
    }

    return null;
}

export default BusinessNavigator;
