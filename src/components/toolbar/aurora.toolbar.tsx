import { Divider, Flex } from 'antd';
import { Align, Bold, FontColor, Horizontal, Italic, Link, Strike, Controller, Underline } from './action';

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

export default function AuroraToolbar({}: AuroraToolbarProps) {
    return (
        <div className="aurora-editor-toolbar">
            <Flex align="center" wrap="wrap" gap={5}>
                <Controller />
                <Bold />
                <Italic />
                <Underline />
                <Strike />
                <Divider type="vertical" style={{ height: '20px' }} />
                <FontColor />
                <Align />
                <Link />
                <Divider type="vertical" style={{ height: '20px' }} />
                <Horizontal />
            </Flex>
        </div>
    );
}
