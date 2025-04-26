export interface AuroraToolbarProps extends AuroraToolbarItemProps {}

export interface AuroraToolbarItemProps {
    bold?: boolean;
    italic?: boolean;
    strike?: boolean;
    heading?: boolean;
    align?: boolean;
    order?: boolean;
    unorder?: boolean;
    check?: boolean;
    link?: boolean;
    code?: boolean;
    image?: boolean;
    table?: boolean;
    color?: boolean;
    highlight?: boolean;
}

export { default as AuroraToolbar } from './aurora.toolbar';
