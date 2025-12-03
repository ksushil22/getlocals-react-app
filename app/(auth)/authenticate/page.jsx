'use client';

import dynamicImport from 'next/dynamic';

const Login = dynamicImport(() => import('../../../src/components/authentication/Login'), {
    ssr: false
});

export const dynamic = 'force-dynamic';

export default function LoginPage() {
    return <Login />;
}

