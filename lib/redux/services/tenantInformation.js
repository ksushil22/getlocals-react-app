import { businessAPI } from '@/lib/redux/services/businessAPI';
import { initializeStore } from '@/lib/redux/store';

const tenantInformationCache = new Map();

export async function fetchTenantInformation(businessUsername) {
    if (!businessUsername) {
        throw new Error('Missing businessUsername when fetching tenant information.');
    }

    if (tenantInformationCache.has(businessUsername)) {
        return tenantInformationCache.get(businessUsername);
    }

    const store = initializeStore();
    const fetchPromise = (async () => {
        try {
            return await store
                .dispatch(
                    businessAPI.endpoints.getTemplateInformation.initiate({
                        businessUsername,
                    })
                )
                .unwrap();
        } finally {
            store.dispatch(businessAPI.util.resetApiState());
        }
    })();

    tenantInformationCache.set(businessUsername, fetchPromise);
    return fetchPromise;
}

