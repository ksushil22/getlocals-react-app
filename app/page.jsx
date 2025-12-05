'use client';

import dynamicImport from 'next/dynamic';

const GetLocalsHomeView = dynamicImport(() => import('@/components/home/GetLocalsHome'), {
    ssr: false
});

export const dynamic = 'force-dynamic';

export default function Home() {
    return <GetLocalsHomeView />;
}
