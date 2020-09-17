import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'src/index.ts',
        output: {
            file: 'lib/index.js',
            format: 'cjs',
        },
        plugins: [nodeResolve(), commonjs(), typescript()],
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'lib/index.esm.js',
            format: 'es',
        },
        plugins: [nodeResolve(), commonjs(), typescript()],
    },
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'lib/index.d.ts',
                format: 'es',
            },
        ],
        plugins: [dts()],
    },
];
