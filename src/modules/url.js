import { camelCase } from 'lodash';

export const getInfoFromUrlHash = (urlHash) => {
    if (!urlHash) {
        return { error: 'Acesso negado. Você não tem permissão para usar o aplicativo' }
    }

    return urlHash.substring(1).split('&')
        .reduce((acc, hashItem) => {
            if (hashItem) {
                const key = hashItem.split('=');
                acc[camelCase(key[0])] = decodeURIComponent(key[1]);
            }

            return acc;
        }, {});
}