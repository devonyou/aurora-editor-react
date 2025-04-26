import { Space } from 'antd';
import { Align, Bold, FontColor, Head, Italic, Link, Strike, Underline } from '../toolbar/action';
import { useAuroraContext } from '../aurora.provider';

export default function Bubble() {
    const { editor } = useAuroraContext();
    if (!editor) return null;

    return (
        <div
            style={{
                backgroundColor: '#f9f9f9',
                padding: '0',
                borderRadius: '10px',
                boxShadow: '0 3px 15px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f0f0f0',
            }}
        >
            <Space>
                <Bold />
                <Italic />
                <Underline />
                <Strike />
                <FontColor />
                <Head />
                <Align />
                <Link />
            </Space>
        </div>
    );
}
