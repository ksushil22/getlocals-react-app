 'use client';

export default function Loading() {
    // This loading component is shown while the page is being rendered
    // It's better for SEO than showing a spinner immediately
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f5f5f5'
        }}>
            {/* Skeleton loader for navigation */}
            <div style={{
                height: '60px',
                backgroundColor: 'rgba(245,245,245,0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid #e0e0e0'
            }} />
            
            {/* Skeleton loader for content */}
            <div style={{
                flex: 1,
                padding: '20px',
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto'
            }}>
                {/* Hero section skeleton */}
                <div style={{
                    height: '400px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    animation: 'pulse 1.5s ease-in-out infinite'
                }} />
                
                {/* Content skeleton */}
                <div style={{ marginTop: '20px' }}>
                    <div style={{
                        height: '30px',
                        width: '200px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '4px',
                        marginBottom: '10px',
                        animation: 'pulse 1.5s ease-in-out infinite'
                    }} />
                    <div style={{
                        height: '20px',
                        width: '100%',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '4px',
                        marginBottom: '8px',
                        animation: 'pulse 1.5s ease-in-out infinite'
                    }} />
                    <div style={{
                        height: '20px',
                        width: '80%',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '4px',
                        animation: 'pulse 1.5s ease-in-out infinite'
                    }} />
                </div>
            </div>
            
            <style jsx>{`
                @keyframes pulse {
                    0% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                    100% {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}