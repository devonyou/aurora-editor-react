import { Tooltip as AntdTooltip, TooltipProps } from 'antd';
import React, { JSX, ReactNode, useState } from 'react';
import { Typography } from 'antd';
import { useAuroraContext } from '../aurora.provider';

const { Text } = Typography;

interface OnuTooltipProps extends Omit<TooltipProps, 'children'> {
    id?: string;
    children?: ReactNode;
}

export default function AuroraTooltip({ id = 'default', children, ...restProps }: OnuTooltipProps) {
    const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});
    const { tooltip } = useAuroraContext();

    if (!tooltip) return <>{children}</>;

    const handleTooltipClose = () => {
        setTooltipOpen({
            ...tooltipOpen,
            [id]: false,
        });
    };

    const child = React.isValidElement(children)
        ? React.cloneElement(children as JSX.Element, {
              onClick: (e: React.MouseEvent) => {
                  handleTooltipClose();

                  const originalOnClick = (children as JSX.Element).props.onClick;
                  if (originalOnClick && typeof originalOnClick === 'function') {
                      originalOnClick(e);
                  }
              },
          })
        : children;

    return (
        <AntdTooltip
            open={tooltipOpen[id]}
            onOpenChange={open => setTooltipOpen({ ...tooltipOpen, [id]: open })}
            destroyTooltipOnHide
            {...restProps}
            style={{ fontSize: '0.5rem' }}
        >
            <Text style={{ fontSize: '0.5rem' }}>{child}</Text>
        </AntdTooltip>
    );
}
