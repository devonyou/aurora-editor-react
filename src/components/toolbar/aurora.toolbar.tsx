import { Col, Divider, Flex, Row } from 'antd';
import { AuroraToolbarProps } from '.';
import {
    Align,
    Bold,
    Check,
    Codeblock,
    FontColor,
    Head,
    Horizontal,
    Italic,
    Link,
    Strike,
    Underline,
    Unorder,
    Youtube,
    Image,
    Blockquote,
    Controller,
} from './action';

export default function AuroraToolbar({}: AuroraToolbarProps) {
    return (
        <div className="aurora-editor-toolbar">
            <Row gutter={[4, 4]} justify="start" align="bottom">
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Flex align="center" wrap="wrap" gap={4}>
                        <Controller />
                        <Bold />
                        <Italic />
                        <Underline />
                        <Strike />
                        <Divider type="vertical" style={{ height: '20px' }} />
                        <FontColor />
                        {/* <Head /> */}
                        <Align />
                        {/* <Blockquote /> */}
                        <Link />
                        {/* <Divider type="vertical" style={{ height: '20px' }} /> */}
                        {/* <Order  /> */}
                        {/* <Unorder /> */}
                        {/* <Check /> */}
                        <Divider type="vertical" style={{ height: '20px' }} />
                        <Horizontal />

                        <Image />
                        <Youtube />
                        {/* <Divider type="vertical" style={{ height: '20px' }} /> */}
                        {/* <Codeblock /> */}
                    </Flex>
                </Col>
                {/* <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Flex align="center" wrap="wrap" gap={4}></Flex>
                </Col> */}
            </Row>
        </div>
    );
}
