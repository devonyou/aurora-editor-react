import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ['src'],
            exclude: ['src/main.tsx', 'src/App.tsx'],
            outDir: 'dist',
            insertTypesEntry: true,
            copyDtsFiles: true,
        }),
        // @ts-ignore
        peerDepsExternal(),
        cssInjectedByJsPlugin(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            src: path.resolve(__dirname, 'src'),
        },
        dedupe: [
            'prosemirror-state',
            'prosemirror-view',
            'prosemirror-model',
            'prosemirror-transform',
            'prosemirror-commands',
            '@tiptap/core',
        ],
    },
    css: {
        modules: {
            scopeBehaviour: 'local',
            localsConvention: 'camelCase',
        },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'AuroraEditor',
            fileName: format => `aurora-editor.${format}.js`,
            formats: ['es'],
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react-icons',
                'react-use',
                'antd',
                '@ant-design/icons',
                '@tiptap/core',
                '@tiptap/pm',
                '@tiptap/react',
                '@tiptap/starter-kit',
                '@tiptap/extension-blockquote',
                '@tiptap/extension-character-count',
                '@tiptap/extension-code-block-lowlight',
                '@tiptap/extension-color',
                '@tiptap/extension-document',
                '@tiptap/extension-drag-handle',
                '@tiptap/extension-dropcursor',
                '@tiptap/extension-focus',
                '@tiptap/extension-heading',
                '@tiptap/extension-highlight',
                '@tiptap/extension-horizontal-rule',
                '@tiptap/extension-link',
                '@tiptap/extension-node-range',
                '@tiptap/extension-paragraph',
                '@tiptap/extension-placeholder',
                '@tiptap/extension-task-item',
                '@tiptap/extension-task-list',
                '@tiptap/extension-text',
                '@tiptap/extension-text-align',
                '@tiptap/extension-text-style',
                '@tiptap/extension-underline',
                '@tiptap/extension-youtube',
                'highlight.js',
                'lowlight',
                'styled-components',
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    antd: 'antd',
                    '@tiptap/react': 'TiptapReact',
                    '@ant-design/icons': 'AntIcons',
                },
                manualChunks: id => {
                    if (id.includes('node_modules')) {
                        if (id.includes('@tiptap')) return 'tiptap';
                        if (id.includes('prosemirror')) return 'prosemirror';
                        if (id.includes('antd') || id.includes('@ant-design')) return 'antd';
                        if (id.includes('highlight.js') || id.includes('lowlight')) return 'syntax-highlight';
                        return 'vendor';
                    }
                },
            },
        },
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug'],
            },
            format: {
                comments: false,
            },
        },
        sourcemap: false,
        emptyOutDir: true,
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'antd'],
    },
});
