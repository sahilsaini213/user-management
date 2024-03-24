
export type MenuMode = 'static' | 'overlay'

export interface QThemeConfig {
    inputStyle?: string;
    dark?: boolean;
    theme?: string;
    ripple?: boolean;
    menuMode?: MenuMode;
}