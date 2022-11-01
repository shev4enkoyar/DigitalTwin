import {ClientRoutes} from "./ClientRoutes";

 export function functionalConverter(functional) {
    let result = null;
    if (ClientRoutes.COMPANY_INVITE === functional){
        result = "Возможность приглашать людей в компанию; ";
    }
    if (ClientRoutes.MODELS === functional){
        result = "Возможность просматривать технологические карты; ";
    }
    if (ClientRoutes.CREATE_MODEL === functional){
        result = "Возможность создавать технологические карты; ";
    }
    if (ClientRoutes.SUBSCRIPTIONS === functional){

        result = "Возможность просматривать подписки на технологические карты; ";
    }

    if (ClientRoutes.SUBSCRIPTIONS_ALL === functional){

        result = "Возможность оформлять подписки на технологические карты; ";
    }

    if (ClientRoutes.DASHBOARD === functional){

        result = "Возможность просматривать общую сводку по технологической карте; ";
    }
    if (ClientRoutes.MAP === functional){

        result = "Возможность работы с картой; ";
    }
    if (ClientRoutes.RECOMMENDATIONS === functional){

        result = "Возможность просматривать рекомендации по технологической карте; ";
    }
    return result;
};

