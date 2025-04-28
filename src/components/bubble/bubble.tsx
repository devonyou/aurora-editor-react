import { Space } from 'antd';
import { Align, Bold, FontColor, Italic, Link, Strike, Underline } from '../toolbar/action';
import { useAuroraContext } from '../aurora.provider';
import { Controller } from '../toolbar/action';

export default function Bubble() {
    const { editor } = useAuroraContext();
    if (!editor) return null;

    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                padding: '3px',
                borderRadius: '20px',
                boxShadow: '0 3px 15px rgba(0, 0, 0, 0.1)',
                border: '2px solid #f0f0f0',
            }}
        >
            <Space>
                <Controller />
                <Bold />
                <Italic />
                <Underline />
                <Strike />
                <FontColor />
                <Align />
                <Link />
            </Space>
        </div>
    );
}
