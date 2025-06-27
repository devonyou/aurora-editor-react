import { ThemeConfig } from 'antd';

export const antdTheme = (primaryColor: string): ThemeConfig => ({
    token: {
        colorPrimary: primaryColor,
        fontFamily:
            'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", "Malgun Gothic", "Apple Gothic", sans-serif',
    },
    components: {
        Typography: {
            fontFamily: 'inherit',
            lineHeight: 1.6,
        },
        Button: {
            fontFamily: 'inherit',
            fontWeight: 500,
        },
        Input: {
            fontFamily: 'inherit',
        },
        Tooltip: {
            fontSize: 10,
            fontFamily: 'inherit',
        },
    },
});
