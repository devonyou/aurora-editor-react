// vite.config.ts
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
            outDir: 'dist',
            insertTypesEntry: true,
            copyDtsFiles: true,
        }),
        // @ts-ignore
        peerDepsExternal(),
        cssInjectedByJsPlugin(),
    ],
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
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug'],
            },
            mangle: true,
            format: {
                comments: false,
            },
        },
        cssCodeSplit: true,
        reportCompressedSize: true,
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'antd',
                '@ant-design/icons',
                '@tiptap/react',
                '@tiptap/extension-blockquote',
                '@tiptap/extension-code-block-lowlight',
                '@tiptap/extension-color',
                '@tiptap/extension-document',
                '@tiptap/extension-dropcursor',
                '@tiptap/extension-heading',
                '@tiptap/extension-highlight',
                '@tiptap/extension-horizontal-rule',
                '@tiptap/extension-image',
                '@tiptap/extension-link',
                '@tiptap/extension-paragraph',
                '@tiptap/extension-placeholder',
                '@tiptap/extension-task-item',
                '@tiptap/extension-task-list',
                '@tiptap/extension-text',
                '@tiptap/extension-text-align',
                '@tiptap/extension-text-style',
                '@tiptap/extension-underline',
                '@tiptap/extension-youtube',
                '@tiptap/pm',
                '@tiptap/starter-kit',
                'highlight.js',
                'lowlight',
                'react-icons',
                'react-use',
                'styled-components',
                'tiptap-extension-auto-joiner',
                'tiptap-extension-global-drag-handle',
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
                        if (id.includes('@tiptap')) {
                            return 'tiptap';
                        } else if (id.includes('antd') || id.includes('@ant-design')) {
                            return 'antd';
                        } else if (id.includes('highlight.js') || id.includes('lowlight')) {
                            return 'syntax-highlight';
                        }
                        return 'vendor';
                    }
                },
                // 트리 쉐이킹 최적화
                preserveModules: false,
                inlineDynamicImports: false,
            },
        },
        sourcemap: false,
        emptyOutDir: true,
    },
    optimizeDeps: {
        include: ['react', 'react-dom'],
    },
});
