import { ThemeConfig } from 'antd';

export const antdTheme = (primaryColor: string): ThemeConfig => ({
    token: {
        colorPrimary: primaryColor,
        fontFamily: 'ACCchildrenheartOTF-Regular',
    },
    components: {
        Tooltip: {
            fontSize: 10,
        },
    },
});
