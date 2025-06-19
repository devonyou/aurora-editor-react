import React, { createContext, useContext, useRef } from 'react';
import { BubbleHandle } from './bubble';

const BubbleRefContext = createContext<React.RefObject<BubbleHandle> | null>(null);

export function BubbleProvider({ children }: { children: React.ReactNode }) {
    const bubbleRef = useRef<BubbleHandle>(null) as React.RefObject<BubbleHandle>;
    return <BubbleRefContext.Provider value={bubbleRef}>{children}</BubbleRefContext.Provider>;
}

export function useBubbleContext() {
    const ref = useContext(BubbleRefContext);
    if (!ref) {
        throw new Error('useBubbleRef must be used within a BubbleProvider');
    }
    return ref;
}
