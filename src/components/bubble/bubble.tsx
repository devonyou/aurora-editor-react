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
                backgroundColor: '#f9f9f9',
                padding: '0',
                borderRadius: '10px',
                boxShadow: '0 3px 15px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f0f0f0',
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
