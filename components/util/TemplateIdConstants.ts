// lib/templates.ts
import Template1Home from '@/components/template1/Template1Home';
import Template1Menu from '@/components/template1/menu/Template1Menu';
import Template1Layout from '@/components/template1/Template1Layout';
import OrderStatusPage from '@/components/orderStatus/OrderStatusPage';
// import other templates/pages as needed

export const templateInfo: Record<
    string,
    {
        layout?: React.ComponentType<any>;
        home?: React.ComponentType<any>;
        menu?: React.ComponentType<any>;
        'order-status'?: React.ComponentType<any>;
        // add more page keys if needed
    }
    > = {
    '067b7d1e-eb92-42e9-9ba0-1021933f6b83': {
        layout: Template1Layout,
        home: Template1Home,
        menu: Template1Menu,
        'order-status': OrderStatusPage, // Universal for all templates
    },

    // When adding new templates, use the same OrderStatusPage component
    // 'another-template-id': { 
    //     layout: AnotherLayout, 
    //     home: AnotherHome, 
    //     menu: AnotherMenu,
    //     'order-status': OrderStatusPage  // Same universal component
    // },
};
