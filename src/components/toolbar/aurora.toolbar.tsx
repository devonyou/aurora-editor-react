import { Col, Divider, Flex, Row } from 'antd';
import { AuroraToolbarProps } from '.';
import {
    Align,
    Bold,
    FontColor,
    Horizontal,
    Italic,
    Link,
    Strike,
    Youtube,
    Image,
    Controller,
    Underline,
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
                        <Align />
                        <Link />
                        <Divider type="vertical" style={{ height: '20px' }} />
                        <Horizontal />
                        <Image />
                        <Youtube />
                    </Flex>
                </Col>
                {/* <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Flex align="center" wrap="wrap" gap={4}></Flex>
                </Col> */}
            </Row>
        </div>
    );
}
